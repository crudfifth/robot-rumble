<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/usecases/shared/stores/authStore'
import Button from '@/components/button/Button.vue'

const userId = ref('test@example.com')
const password = ref('password')
const showPassword = ref(false)
const errorMessage = ref<{ userId?: string; password?: string }>({})
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  errorMessage.value = {}

  if (!userId.value) errorMessage.value.userId = 'ユーザーIDを入力してください'
  if (!password.value) errorMessage.value.password = 'パスワードを入力してください'

  if (!userId.value || !password.value) return

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId.value, password: password.value }),
    })

    if (!response.ok) {
      throw new Error('ログイン失敗')
    }

    const data = await response.json()

    authStore.login(data.token, userId.value)

    router.push('/dashboard')
  } catch (error) {
    alert(`ログインエラー: ${(error as Error).message}`)
    errorMessage.value.password = 'ログインに失敗しました'
  }
}

const handlePasswordReset = () => {
  router.push('/password-reset')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="bg-white p-8 shadow-lg rounded-8 w-96">
      <h1 class="text-2xl font-bold text-center mb-4">予予・請求システム</h1>
      <h2 class="text-xl font-semibold text-center mb-2">ログイン</h2>

      <form class="mt-4" @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="userId" class="block text-sm font-semibold">ユーザーID</label>
          <input
            id="userId"
            v-model="userId"
            type="text"
            class="w-full p-2 border rounded-4 focus:ring focus:ring-blue-300"
            required
          />
          <p v-if="errorMessage.userId" class="text-red-500 text-sm mt-1">
            {{ errorMessage.userId }}
          </p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold">パスワード</label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full p-2 border rounded-4 focus:ring focus:ring-blue-300"
            required
          />
          <p v-if="errorMessage.password" class="text-red-500 text-sm mt-1">
            {{ errorMessage.password }}
          </p>
          <div class="mt-2">
            <input id="showPassword" v-model="showPassword" type="checkbox" class="mr-2" />
            <label for="showPassword" class="text-gray-600 text-sm">パスワードを表示する</label>
          </div>
        </div>

        <div class="mt-6">
          <Button text="ログイン" variant="solid-fill" size="lg" type="submit" class="w-full" />
        </div>
      </form>

      <div class="mt-4 text-center">
        <Button
          text="パスワードリセット"
          variant="text"
          size="sm"
          :onClick="handlePasswordReset"
          class="text-blue-600 hover:underline"
        />
      </div>
    </div>
  </div>
</template>
