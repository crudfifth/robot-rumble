<!-- filepath: /C:/mywork/20250325/yysk-client-business/src/usecases/sample/user-sample/views/UserList.vue -->
<template>
  <div class="file-manager">
    <div v-if="userStore.loading">読み込み中...</div>
    <div v-else-if="userStore.error" class="error">
      {{ userStore.error }}
    </div>
    <div v-else>
      <h2>ユーザー一覧</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>名前</th>
            <th>メールアドレス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="update-button" @click="goToUpdate(String(user.id))">更新</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import UserForm from './UserForm.vue'

const userStore = useUserStore()
const router = useRouter()

// 更新画面に遷移する関数
const goToUpdate = (userId: string) => {
  router.push({ name: 'UserUpdate', params: { id: userId } })
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style scoped>
.file-manager {
  padding: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f4f4f4;
}

.update-button {
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
