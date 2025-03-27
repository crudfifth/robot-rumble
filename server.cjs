// server.cjs
const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// アップロードディレクトリの作成
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multerの設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB制限
  }
});

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// リクエストの状態を追跡するための変数
const failedRequests = {};

// CORSミドルウェアの設定
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition'); 
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);



// ユーザー作成のルート設定
server.post('/users', (req, res) => {
  try {
    let user = req.body;
    user.id = Date.now().toString();

    const db = router.db;
    const users = db.get('users');

    if (!users.value()) {
      db.set('users', []).write();
    }

    users.push(user).write();
    res.json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// ユーザー一覧の取得
server.get('/users', (req, res) => {
  try {
    const users = router.db.get('users').value() || [];
    res.json(users);
  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// ユーザーの取得
server.get('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const user = router.db.get('users').find({ id: userId }).value();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// ユーザーの更新
server.put('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    const user = router.db.get('users').find({ id: userId });

    if (!user.value()) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.assign(updatedUser).write();
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// ユーザーの削除
server.delete('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const user = router.db.get('users').find({ id: userId }).value();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    router.db.get('users').remove({ id: userId }).write();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ファイルアップロードのルート設定
server.post('/files/upload', upload.single('file'), (req, res) => {
  try {
    console.log('Upload request received:', req.file);
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // ファイル情報の作成
    const fileInfo = {
      id: Date.now().toString(),
      name: req.file.originalname,
      size: req.file.size,
      path: req.file.path.replace(/\\/g, '/'), // Windowsのパス区切り文字を変換
      uploadedAt: new Date().toISOString()
    };

    console.log('File info:', fileInfo);

    // db.jsonにファイル情報を追加
    try {
      const db = router.db; // lowdbのデータベースインスタンスを取得
      const files = db.get('files');
      
      if (!files.value()) {
        // filesコレクションが存在しない場合は作成
        db.set('files', []).write();
      }
      
      files.push(fileInfo).write();
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save file information' });
    }

    res.json(fileInfo);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
});

// 複数ファイルアップロードのルート設定
server.post('/files/upload-multiple', upload.array('documents', 10), (req, res) => {
  try {
    console.log('Upload request received:', req.files);

    if (!req.files || req.files.length === 0) {
      console.log('No files in request');
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // ファイル情報の作成
    const fileInfos = req.files.map((file) => ({
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 15),
      name: file.originalname,
      size: file.size,
      path: file.path.replace(/\\/g, '/'), // Windowsのパス区切り文字を変換
      uploadedAt: new Date().toISOString(),
    }));

    console.log('File infos:', fileInfos);

    // db.jsonにファイル情報を追加
    try {
      const db = router.db; // lowdbのデータベースインスタンスを取得
      const files = db.get('files');

      if (!files.value()) {
        // filesコレクションが存在しない場合は作成
        db.set('files', []).write();
      }

      fileInfos.forEach((fileInfo) => files.push(fileInfo).write());
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save file information' });
    }

    res.json(fileInfos);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
});

// ファイルダウンロードのルート設定
server.get('/files/:id/download', (req, res) => {
  try {
    const fileId = req.params.id;
    const file = router.db.get('files').find({ id: fileId }).value();

    if (!file || !file.path || !fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found' });
    }
    const fileContent = fs.readFileSync(file.path, 'utf8');
    console.log('--------File Content:', fileContent); // コンソールに内容を出力
    res.setHeader('Content-Type', 'application/json'); // JSONファイルのMIMEタイプを明
    console.log('--------get header', res.getHeader('Content-Type'));
    res.download(file.path, file.name);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'File download failed' });
  }
});

// ファイル一覧の取得
server.get('/files', (req, res) => {
  try {
    // const clientId = req.ip || req.headers['x-forwarded-for'] || 'unknown'; // クライアントを識別するためのキー
    // // 初回リクエストを失敗させる
    // if (!failedRequests[clientId]) {
    //   // 初回リクエストを失敗させる
    //   failedRequests[clientId] = true; // 初回リクエストを記録
    //   console.log(`Simulating failure for client: ${clientId}`);
    //   return res.status(500).json({ error: 'Simulated server error. Please retry.' });
    // }

    const files = router.db.get('files').value() || [];
    res.json(files);
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

// ファイルの削除
server.delete('/files/:id', (req, res) => {
  try {
    const fileId = req.params.id;
    const file = router.db.get('files').find({ id: fileId }).value();

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // ファイルシステムからファイルを削除
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // データベースからファイル情報を削除
    router.db.get('files').remove({ id: fileId }).write();

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// エラーハンドリングミドルウェア
server.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message 
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Upload directory: ${uploadDir}`);
});