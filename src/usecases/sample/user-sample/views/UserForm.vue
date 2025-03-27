<!-- src/components/UserForm.vue -->
<template>
  <div class="user-form">
    <h3>新規ユーザー作成</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">名前:</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">メール:</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '作成中...' : '作成' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useUsers } from '../composables/useUsers'
import type { CreateUserRequest } from '../types/user'

export default defineComponent({
  name: 'UserForm',
  setup() {
    const { createUser } = useUsers()
    const loading = ref(false)
    const form = reactive<CreateUserRequest>({
      name: '',
      email: '',
    })

    const handleSubmit = async () => {
      try {
        loading.value = true
        await createUser(form)
        form.name = ''
        form.email = ''
      } catch (error) {
        alert((error as Error).message)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      handleSubmit,
    }
  },
})
</script>

<style scoped>
.user-form {
  padding: 20px;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}
</style>
