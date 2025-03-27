<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">ユーザ作成</h1>
    <BlockAreaTitle title="アカウント情報" />
    <p class="text-red-500 text-sm mb-4">この画面のすべての項目は必須です。</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input id="email" type="email" v-model="email" required class="form-input" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="confirmEmail">メールアドレス（確認）</label>
        <input id="confirmEmail" type="email" v-model="confirmEmail" required class="form-input" />
        <p v-if="errors.confirmEmail" class="text-red-500 text-sm">{{ errors.confirmEmail }}</p>
      </div>

      <div class="form-group">
        <label for="userName">ユーザ氏名</label>
        <input id="userName" type="text" v-model="userName" required class="form-input" />
        <p v-if="errors.userName" class="text-red-500 text-sm">{{ errors.userName }}</p>
      </div>

      <div class="form-group">
        <label>ユーザ区分</label>
        <div>
          <label><input type="radio" v-model="userType" value="一般" required /> 一般</label>
          <label class="ml-4"
            ><input type="radio" v-model="userType" value="管理者" required /> 管理者</label
          >
        </div>
      </div>

      <div class="form-group">
        <label>ロール</label>
        <div>
          <label><input type="checkbox" v-model="roles" value="自治体" /> 自治体</label>
          <label class="ml-4"
            ><input type="checkbox" v-model="roles" value="代理登録機関(自治体)" />
            代理登録機関(自治体)</label
          >
        </div>
      </div>

      <div class="form-group">
        <label>マイナンバー閲覧権限</label>
        <div>
          <label
            ><input type="radio" v-model="myNumberAccess" value="閲覧できる" required />
            マイナンバーを閲覧できる</label
          >
          <label class="ml-4"
            ><input type="radio" v-model="myNumberAccess" value="閲覧できない" required />
            マイナンバーを閲覧できない</label
          >
        </div>
      </div>

      <div class="flex justify-between">
        <Button text="戻る" variant="text" size="md" @click="goBack" />
        <Button text="登録" variant="solid-fill" size="md" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BlockAreaTitle from '@/components/title/BlockAreaTitle.vue'
import Button from '@/components/button/Button.vue'

const router = useRouter()

const email = ref('')
const confirmEmail = ref('')
const userName = ref('')
const userType = ref('')
const roles = ref<string[]>([])
const myNumberAccess = ref('')
const errors = ref<{ [key: string]: string }>({})

const goBack = () => {
  router.go(-1)
}

const handleSubmit = async () => {
  errors.value = {}

  if (!email.value.includes('@')) {
    errors.value.email = '正しいメールアドレスを入力してください'
  }
  if (confirmEmail.value !== email.value) {
    errors.value.confirmEmail = 'メールアドレスが一致しません'
  }
  if (!userName.value) {
    errors.value.userName = 'ユーザ氏名を入力してください'
  }

  if (Object.keys(errors.value).length === 0) {
    const payload = {
      name: userName.value,
      userType: userType.value,
      role: roles.value[0] || '',
      accountStatus: '利用中',
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const error = await res.json()
      alert(`登録に失敗しました: ${error.message}`)
      return
    }

    alert('ユーザが作成されました')
    router.push('/users')
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.text-red-500 {
  color: red;
}
</style>
