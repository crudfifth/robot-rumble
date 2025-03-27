<!-- src/components/FileUploader.vue -->
<template>
  <div class="file-uploader">
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileSelect"
    />
    <div v-if="uploading" class="progress">
      アップロード進捗: {{ progress }}%
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileRepository } from '../repositories/fileRepository'

defineProps({
  accept: {
    type: String,
    default: '*/*',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['upload-complete', 'upload-error'])

const uploading = ref(false)
const progress = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  try {
    uploading.value = true
    const files = Array.from(input.files)

    if (files.length === 1) {
      // 単一ファイルのアップロード
      const fileRecord: Record<string, File> = {
        file: files[0], // キー名は 'フォームのnameに準ずる。仮でfile'
      }

      const result = await FileRepository.uploadFile(
        fileRecord,
        { description: 'Uploaded from web' },
        (progressData) => {
          progress.value = progressData.progress
        },
      )

      console.log('Upload result:', result)
    } else {
      // 複数ファイルのアップロード
      const fileData: Record<string, File[]> = {
        documents: files, // キー名は 'フォームのnameに準ずる。仮でdocuments'
      }

      const result = await FileRepository.uploadFiles(
        fileData,
        { description: 'Uploaded multiple files from web' },
        (progressData) => {
          progress.value = progressData.progress
        },
      )

      console.log('Upload result:', result)
    }
    emit('upload-complete')

    // 入力をリセット
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    console.error('Upload error:', error)
    emit('upload-error', error)
  } finally {
    uploading.value = false
    progress.value = 0
  }
}
</script>

<style scoped>
.file-uploader {
  margin: 20px 0;
}

.progress {
  margin-top: 10px;
}

.progress-bar {
  height: 4px;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>
