<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BlockAreaTitle from '@/components/title/BlockAreaTitle.vue'
import Table from '@/components/table/Table.vue'
import Button from '@/components/button/Button.vue'

// ルート情報取得
const route = useRoute()
const userId = ref(route.params.id)

// ユーザー詳細情報
const userDetails = ref({
  organizationName: 'XXXX',
  organizationId: 'XXXX',
  userId: 'XXXX',
  email: 'XXXX',
  userName: 'XXXX',
  userType: '管理者',
  role: '自治体',
  accountStatus: '有効',
  myNumberAccess: 'マイナンバーを閲覧できる',
})

// 紐付けアカウント情報
const linkedAccounts = ref([
  { index: 1, userId: '1000002', organizationId: '130001', organizationName: '組織A' },
  { index: 2, userId: '1000003', organizationId: '130002', organizationName: '組織B' },
  { index: 3, userId: '1000004', organizationId: '130003', organizationName: '組織C' },
])

// 紐付けアカウントテーブルのヘッダー
const linkedAccountHeaders = ['項番', 'ユーザID', '組織ID', '組織名']

// ページ遷移時にユーザIDを取得する
onMounted(() => {
  console.log('ユーザID:', userId.value)
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">ユーザ詳細情報</h1>

    <!-- アカウント情報 -->
    <BlockAreaTitle title="アカウント情報" />
    <div class="account-info">
      <p><strong>組織名</strong>：{{ userDetails.organizationName }}</p>
      <p><strong>組織ID</strong>：{{ userDetails.organizationId }}</p>
      <p><strong>ユーザID</strong>：{{ userDetails.userId }}</p>
      <p><strong>メールアドレス</strong>：{{ userDetails.email }}</p>
      <p><strong>ユーザ氏名</strong>：{{ userDetails.userName }}</p>
      <p><strong>ユーザ区分</strong>：{{ userDetails.userType }}</p>
      <p><strong>ロール</strong>：{{ userDetails.role }}</p>
      <p><strong>アカウント状態</strong>：{{ userDetails.accountStatus }}</p>
      <p><strong>マイナンバー閲覧権限</strong>：{{ userDetails.myNumberAccess }}</p>
    </div>

    <!-- 紐付けアカウント -->
    <BlockAreaTitle title="紐付けアカウント" />
    <Table :headers="linkedAccountHeaders" :rows="linkedAccounts" :selectable="false" />

    <!-- すべて表示ボタン -->
    <div class="text-center mt-4">
      <Button text="すべて表示" variant="outline" size="md" />
    </div>
  </div>
</template>

<style scoped>
.account-info {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.account-info p {
  margin-bottom: 8px;
}
</style>
