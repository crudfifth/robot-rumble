<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/button/Button.vue'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import { useAuthStore } from '@/usecases/shared/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const currentUser = computed(() => authStore.currentUser ?? { id: '', name: 'ゲスト' })
const linkedUsers = computed(() => authStore.linkedUsers ?? [])
const lastLogin = computed(() => authStore.lastLogin ?? '未ログイン')

const selectedUser = ref(currentUser.value?.id || '')

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="bg-gray-100 shadow-md p-4 flex justify-between items-center">
    <div class="flex items-center">
      <h1 class="text-xl font-bold">予予・請求システム</h1>
    </div>

    <div class="flex items-center space-x-4">
      <select v-if="linkedUsers.length" v-model="selectedUser" class="border p-2">
        <option v-for="user in linkedUsers" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <span v-else class="text-gray-500">紐付けユーザなし</span>

      <div class="text-sm">
        <p>ログイン中のユーザ: {{ currentUser.name }}</p>
        <p>前回ログイン: {{ lastLogin }}</p>
      </div>
    </div>

    <div>
      <Button text="ログアウト" variant="solid-fill" size="md" @click="logout" />
    </div>
  </header>

  <Breadcrumbs />
</template>

<style scoped>
select {
  @apply border px-2 py-1 rounded;
}
</style>
