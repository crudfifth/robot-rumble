<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/button/Button.vue'

const router = useRouter()
const userId = ref('')
const email = ref('')
const errorMessage = ref<{ userId?: string; email?: string }>({})

const handleReset = () => {
  errorMessage.value = {}
  if (!userId.value) errorMessage.value.userId = 'ユーザーIDを入力してください'
  if (!email.value) errorMessage.value.email = 'メールアドレスを入力してください'
  if (userId.value && email.value) {
    alert(`パスワードリセット処理実行:\nユーザーID: ${userId.value}\nメール: ${email.value}`)
    // TODO: パスワードリセット処理の実装
  }
}

const goBack = () => {
  router.push('/login')
}
</script>
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-8 shadow-lg w-96">
      <!-- システムタイトル -->
      <h1 class="text-2xl font-bold text-gray-900">予予・請求システム</h1>

      <!-- パスワードリセットタイトル -->
      <h2 class="text-xl font-semibold text-gray-800 mt-4">パスワードリセット</h2>

      <!-- ユーザーID -->
      <div class="mt-4">
        <label for="userId" class="block text-gray-700 font-medium">
          ユーザーID <span class="text-red-500">※必須</span>
        </label>
        <input
          id="userId"
          v-model="userId"
          type="text"
          class="border rounded-4 w-full px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
          placeholder="ユーザーIDを入力"
        />
        <p v-if="errorMessage.userId" class="text-red-500 text-sm mt-1">
          {{ errorMessage.userId }}
        </p>
      </div>

      <!-- メールアドレス -->
      <div class="mt-4">
        <label for="email" class="block text-gray-700 font-medium">
          メールアドレス <span class="text-red-500">※必須</span>
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="border rounded-4 w-full px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
          placeholder="メールアドレスを入力"
        />
        <p v-if="errorMessage.email" class="text-red-500 text-sm mt-1">{{ errorMessage.email }}</p>
      </div>

      <!-- リセットボタン -->
      <div class="mt-6">
        <Button
          text="リセット"
          variant="solid-fill"
          size="lg"
          :onClick="handleReset"
          class="w-full"
        />
      </div>

      <!-- 戻るボタン -->
      <div class="mt-4 text-center">
        <Button
          text="戻る"
          variant="text"
          size="sm"
          :onClick="goBack"
          class="text-blue-600 hover:underline"
        />
      </div>
    </div>
  </div>
</template>
