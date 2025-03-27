import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const userId = ref<string>('')
    const currentUser = ref({ id: '', name: 'ゲスト' })
    const linkedUsers = ref<Array<any>>([])
    const lastLogin = ref('未ログイン')

    const login = (newToken: string, newUserId: string) => {
      token.value = newToken
      userId.value = newUserId
    }

    const logout = () => {
      token.value = null
      userId.value = ''
    }

    return { token, userId, currentUser, linkedUsers, lastLogin, login, logout }
  },
  {
    persist: {
      key: 'auth',
      storage: localStorage,
    },
  },
)
