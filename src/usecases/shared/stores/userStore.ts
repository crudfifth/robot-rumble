import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUsers } from '@/usecases/shared/repositories/userRepository'
import type { User } from '@/usecases/shared/types/user'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  // ユーザー一覧を取得
  const loadUsers = async (filters?: Record<string, string>) => {
    loading.value = true
    try {
      users.value = await fetchUsers(filters)
    } finally {
      loading.value = false
    }
  }

  return { users, loading, loadUsers }
})
