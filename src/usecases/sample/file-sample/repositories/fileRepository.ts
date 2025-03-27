// src/repositories/fileRepository.ts
import { createHttpClient } from '../../../common/services/httpClientProvider'

const httpClient = createHttpClient()

export interface FileInfo {
  id: string
  name: string
  size: number
  uploadedAt: string
}

export class FileRepository {
  private static BASE_PATH = '/files'

  static async uploadFile(
    fileRecord: Record<string, File>,
    metadata?: Record<string, unknown>,
    onProgress?: (progress: { loaded: number; total: number; progress: number }) => void,
  ) {
    return httpClient.uploadFile<FileInfo>(
      `${this.BASE_PATH}/upload`,
      fileRecord,
      metadata,
      onProgress,
    )
  }

  static async uploadFiles(
    files: Record<string, File[]>,
    metadata?: Record<string, unknown>,
    onProgress?: (progress: { loaded: number; total: number; progress: number }) => void,
  ) {
    return httpClient.uploadFiles<FileInfo>(
      `${this.BASE_PATH}/upload-multiple`,
      files,
      metadata,
      onProgress,
    )
  }

  static async downloadFile(
    fileId: string,
    onProgress?: (progress: { loaded: number; total: number; progress: number }) => void,
  ): Promise<Blob> {
    return httpClient.downloadFile(`${this.BASE_PATH}/${fileId}/download`, 'GET', onProgress)
  }

  static async getFiles() {
    return await httpClient.get(this.BASE_PATH)
  }

  static async deleteFile(fileId: string): Promise<void> {
    await httpClient.delete(`${this.BASE_PATH}/${fileId}`)
  }
}
