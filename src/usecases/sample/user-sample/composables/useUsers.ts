// src/composables/useUsers.ts
/**
 * ユーザー関連の共通ロジックを提供するComposable
 */
import { ref } from 'vue'
import type { User, CreateUserRequest } from '../types/user'
import { UserService } from '../services/userService'

export function useUsers() {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string>('')

  const fetchUsers = async () => {
    try {
      loading.value = true
      users.value = await UserService.getUsers()
      // users.valueの内容をコンソールログに出す
      // console.log(users.value);
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: CreateUserRequest) => {
    try {
      loading.value = true
      const newUser = await UserService.createUser(userData)
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = (err as Error).message
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
  }
}
