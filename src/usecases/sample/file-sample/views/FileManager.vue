<!-- src/views/FileManager.vue -->
<template>
  <div class="file-manager">
    <h2>ファイル管理</h2>

    <!-- アップロードセクション -->
    <section class="upload-section">
      <h3>ファイルアップロード</h3>
      <FileUploader
        accept="*/*"
        :multiple="true"
        @upload-complete="handleUploadComplete"
        @upload-error="handleUploadError"
      />
      <div v-if="uploadStatus" :class="['status-message', uploadStatus.type]">
        {{ uploadStatus.message }}
      </div>
    </section>

    <!-- ファイル一覧セクション -->
    <section class="files-section">
      <h3>ファイル一覧</h3>
      <div v-if="loading" class="loading">読み込み中...</div>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-else>
        <table class="files-table">
          <thead>
            <tr>
              <th>ファイル名</th>
              <th>サイズ</th>
              <th>アップロード日時</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>{{ file.name }}</td>
              <td>{{ formatFileSize(file.size) }}</td>
              <td>{{ formatDate(file.uploadedAt) }}</td>
              <td>
                <FileDownloader
                  :file-id="file.id"
                  :filename="file.name"
                  @download-start="handleDownloadStart(file)"
                  @download-complete="handleDownloadComplete(file)"
                  @download-error="handleDownloadError"
                />
                <button class="delete-button" @click="handleDelete(file)">削除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileUploader from './FileUploader.vue'
import FileDownloader from './FileDownloader.vue'
import { FileRepository } from '../repositories/fileRepository'

interface File {
  id: string
  name: string
  size: number
  uploadedAt: string
}

interface StatusMessage {
  type: 'success' | 'error'
  message: string
}

const files = ref<File[]>([])
const loading = ref(false)
const error = ref<string>('')
const uploadStatus = ref<StatusMessage | null>(null)

// ファイル一覧の取得
const fetchFiles = async () => {
  try {
    loading.value = true
    console.log('Fetching files...')
    const response = await FileRepository.getFiles()
    files.value = response.data
    console.log('Files:', files.value)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      console.error('Unexpected error:', error)
      error.value = new Error('Unexpected error occurred').message
    }
  } finally {
    loading.value = false
  }
}

// アップロード完了時の処理
const handleUploadComplete = () => {
  uploadStatus.value = {
    type: 'success',
    message: 'ファイルのアップロードが完了しました',
  }
  fetchFiles() // 一覧を更新
}

// アップロードエラー時の処理
const handleUploadError = (error: Error) => {
  uploadStatus.value = {
    type: 'error',
    message: `アップロードエラー: ${error.message}`,
  }
}

// ダウンロード開始時の処理
const handleDownloadStart = (file: File) => {
  console.log(`Downloading: ${file.name}`)
}

// ダウンロード完了時の処理
const handleDownloadComplete = (file: File) => {
  console.log(`Download complete: ${file.name}`)
}

// ダウンロードエラー時の処理
const handleDownloadError = (error: Error) => {
  console.error('Download error:', error)
}

// ファイル削除の処理
const handleDelete = async (file: File) => {
  if (!confirm(`${file.name}を削除してもよろしいですか？`)) return

  try {
    await FileRepository.deleteFile(file.id)
    await fetchFiles() // 一覧を更新
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = `削除エラー: ${err.message}`
    } else {
      // console.error('Unexpected error:', error);
      error.value = new Error('Unexpected error occurred').message
    }
  }
}

// ユーティリティ関数
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString()
}

// 初期データの取得
onMounted(() => {
  fetchFiles()
})
</script>

<style scoped>
.file-manager {
  padding: 20px;
}

.upload-section,
.files-section {
  margin-bottom: 30px;
}

.status-message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.status-message.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.status-message.error {
  background-color: #f2dede;
  color: #a94442;
}

.files-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.files-table th,
.files-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.files-table th {
  background-color: #f5f5f5;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error-message {
  padding: 20px;
  color: #a94442;
  background-color: #f2dede;
  border-radius: 4px;
}

.delete-button {
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
