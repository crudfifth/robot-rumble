<!-- filepath: /C:/mywork/gitlab/architecture-team/yysk-client-business/src/usecases/user/views/UserUpdate.vue -->
<template>
  <div class="user-update">
    <h2>ユーザー更新</h2>
    <div v-if="userStore.loading">読み込み中...</div>
    <div v-else-if="userStore.error" class="error">
      {{ userStore.error }}
    </div>
    <div v-else>
      <form @submit.prevent="updateUser">
        <label>
          名前:
          <input v-model="user.name" type="text" />
        </label>
        <label>
          メール:
          <input v-model="user.email" type="email" />
        </label>
        <button type="submit">更新</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const user = ref({ id: '', name: '', email: '' })

onMounted(async () => {
  const userId = route.params.id as string
  const fetchedUser = await userStore.fetchUserById(userId) // ユーザー情報を取得

  if (fetchedUser) {
    user.value = {
      ...fetchedUser,
      id: String(fetchedUser.id), // id を文字列に変換
    }
  } else {
    console.error('User not found')
    router.push({ name: 'users' }) // ユーザーが見つからない場合、一覧に戻る
  }
})

const updateUser = async () => {
  await userStore.updateUser(user.value) // ユーザー情報を更新
  router.push({ name: 'users' }) // 更新後にユーザー一覧に戻る
}
</script>

<style scoped>
.user-update {
  padding: 20px;
}

.error {
  color: red;
}
</style>
