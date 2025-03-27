import FileManager from '@/usecases/sample/file-sample/views/FileManager.vue'
export const fileRouter = [
  {
    path: '/sample/files',
    name: 'Files',
    component: FileManager,
    meta: { title: 'ファイル管理', requiresAuth: true },
  },
]
