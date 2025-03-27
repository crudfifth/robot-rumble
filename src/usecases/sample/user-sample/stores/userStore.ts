// src/stores/userStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, CreateUserRequest } from '../types/user'
import { UserService } from '../services/userService'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string>('')

  async function fetchUsers() {
    try {
      loading.value = true
      users.value = await UserService.getUsers()
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

  async function createUser(userData: CreateUserRequest) {
    try {
      loading.value = true
      const newUser = await UserService.createUser(userData)
      users.value.push(newUser)
      return newUser
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        console.error('Unexpected error:', error)
        error.value = new Error('Unexpected error occurred').message
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUserById(userId: string) {
    try {
      loading.value = true
      const updUser = await UserService.getUserById(userId)
      return updUser
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

  async function updateUser(user: { id: string; name: string; email: string }) {
    try {
      loading.value = true
      const updUser = await UserService.updateUser(user)

      // 既存のユーザーを更新
      const index = users.value.findIndex((u) => u.id === Number(user.id))
      if (index !== -1) {
        users.value[index] = updUser
      } else {
        // ユーザーが存在しない場合は追加
        users.value.push(updUser)
      }

      return updUser
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        console.error('Unexpected error:', error)
        error.value = new Error('Unexpected error occurred').message
      }
      throw err
    } finally {
      loading.value = false
    }
  }
  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    fetchUserById,
    updateUser,
  }
})
