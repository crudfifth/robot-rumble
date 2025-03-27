<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/usecases/shared/stores/userStore'
import { formatUserData } from '@/usecases/shared/services/userService'
import Table from '@/components/table/Table.vue'
import UserSearchForm from '@/components/form/SearchForm.vue'
import BlockAreaTitle from '@/components/title/BlockAreaTitle.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Button from '@/components/button/Button.vue'
import { ROUTE_NAMES } from '@/usecases/shared/router/routeNames'
import type { TableRow, TableAction } from '@/components/table/types'
import type { FieldConfig } from '@/usecases/shared/types/form'

const router = useRouter()
const userStore = useUserStore()

const itemsPerPage = 10
const currentPage = ref(1)

// 初回ユーザー取得
onMounted(() => {
  userStore.loadUsers()
})

// ユーザー一覧（整形済み）
const formattedUsers = computed<TableRow[]>(() => formatUserData(userStore.users))

// ページネーション
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return formattedUsers.value.slice(start, start + itemsPerPage)
})

const recordCount = computed(() => formattedUsers.value.length)

const onPageChange = (newPage: number) => {
  currentPage.value = newPage
}

// ヘッダー定義
const tableHeaders = ['ID', 'ユーザ氏名', 'ユーザ区分', 'ロール', 'アカウント状態']

// 検索フィールド
const searchFields: FieldConfig[] = [
  { label: 'ユーザ氏名', type: 'text', model: 'name' },
  { label: 'ユーザ区分', type: 'radio', model: 'userType', options: ['すべて', '一般', '管理者'] },
  { label: 'ロール', type: 'checkbox', model: 'role', options: ['自治体', '代理登録機関(自治体)'] },
  {
    label: 'アカウント状態',
    type: 'radio',
    model: 'accountStatus',
    options: ['すべて', '利用中', '停止中'],
  },
]

// 検索時の処理
const handleSearch = (formData: Record<string, string | string[] | Date | null>) => {
  const refined: Record<string, string> = {}

  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        refined[key] = value.join(',')
      }
    } else if (value instanceof Date) {
      refined[key] = value.toISOString().split('T')[0] // 例: "2025-03-25"
    } else if (typeof value === 'string') {
      if (value !== '' && value !== 'すべて') {
        refined[key] = value
      }
    }
  }

  currentPage.value = 1
  userStore.loadUsers(refined)
}

// 遷移系
const goToUserCreate = () => {
  router.push({ name: ROUTE_NAMES.USER_CREATE })
}

const goToUserDetail = (row: TableRow) => {
  router.push({ name: ROUTE_NAMES.USER_DETAIL, params: { id: row.id.toString() } })
}

const tableActions: TableAction[] = [{ label: '詳細', handler: goToUserDetail }]
</script>

<template>
  <div class="p-6">
    <!-- タイトル -->
    <div class="header-container">
      <h1 class="text-2xl font-bold">ユーザー一覧</h1>
      <Button text="ユーザ作成に進む" variant="solid-fill" size="md" @click="goToUserCreate" />
    </div>

    <!-- 検索 -->
    <BlockAreaTitle title="検索条件" />
    <UserSearchForm :fields="searchFields" @search="handleSearch" />

    <!-- 検索結果 -->
    <BlockAreaTitle title="検索結果" />
    <p class="mb-4 text-gray-700">{{ recordCount }} 件が該当しました</p>

    <!-- ページネーション（上） -->
    <Pagination
      v-if="recordCount > itemsPerPage"
      :totalItems="recordCount"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @pageChange="onPageChange"
    />

    <!-- テーブル -->
    <Table
      :headers="tableHeaders"
      :rows="paginatedRows"
      :actions="tableActions"
      :selectable="true"
    />

    <!-- ページネーション（下） -->
    <Pagination
      v-if="recordCount > itemsPerPage"
      :totalItems="recordCount"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @pageChange="onPageChange"
    />
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
