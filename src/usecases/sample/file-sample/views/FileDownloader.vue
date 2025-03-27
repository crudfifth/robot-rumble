<!-- src/components/FileDownloader.vue -->
<template>
  <button :disabled="downloading" class="download-button" @click="handleDownload">
    <span v-if="downloading"> ダウンロード中 ({{ progress }}%) </span>
    <span v-else> ダウンロード </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileRepository } from '../repositories/fileRepository'

const props = defineProps<{
  fileId: string
  filename: string
}>()

const emit = defineEmits<{
  (e: 'download-start'): void
  (e: 'download-complete'): void
  (e: 'download-error', error: Error): void
}>()

const downloading = ref(false)
const progress = ref(0)

const handleDownload = async () => {
  try {
    downloading.value = true
    emit('download-start')

    await FileRepository.downloadFile(props.fileId, (progressData) => {
      progress.value = progressData.progress
    })

    emit('download-complete')
  } catch (error: unknown) {
    if (error instanceof Error) {
      // console.error('Download error:', error.message);
      emit('download-error', error)
    } else {
      // console.error('Unexpected error:', error);
      emit('download-error', new Error('Unexpected error occurred'))
    }
  } finally {
    downloading.value = false
    progress.value = 0
  }
}
</script>

<style scoped>
.download-button {
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.download-button:not(:disabled):hover {
  background-color: #0056b3;
}
</style>
