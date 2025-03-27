<script setup lang="ts">
import { ref } from 'vue'

// ユーザー情報
const userName = ref('接種 四太郎')

// メニューリスト（仮データ）
const menuList = ref([
  { label: 'ユーザー一覧', route: '/users' },
  { label: '請求書等確認・公開', route: '/' },
  { label: 'CSVデータ項目指定出力', route: '/' },
  { label: '全国決済関連帳票出力', route: '/' },
  { label: '未還納機器累計確認・入力', route: '/' },
  { label: '接種記録保留', route: '/' },
  { label: '医療機関口座情報承認', route: '/' },
  { label: 'サンプルユースケース', route: '/sample' },
])

// お知らせ（仮データ）
const notices = ref([
  {
    id: 1,
    date: '2024/11/1',
    content: 'システムメンテナンスのため、以下日程でシステムを停止します。',
    link: '/',
  },
  {
    id: 2,
    date: '2024/11/1',
    content: 'システムメンテナンスのため、以下日程でシステムを停止します。',
  },
  {
    id: 3,
    date: '2024/11/1',
    content: 'システムメンテナンスのため、以下日程でシステムを停止します。',
  },
])
</script>
<template>
  <div class="dashboard-container flex h-screen">
    <!-- メニューエリア -->
    <aside class="menu-area w-1/4 bg-gray-100 p-6 border-r">
      <h2 class="text-lg font-bold mb-4">連合会向けメニュー</h2>
      <ul>
        <li v-for="menu in menuList" :key="menu.label" class="mb-2">
          <router-link :to="menu.route" class="text-blue-600 hover:underline">
            {{ menu.label }}
          </router-link>
        </li>
      </ul>

      <h2 class="text-lg font-bold mt-6 mb-4">マスタ等登録・参照</h2>
      <ul>
        <li>
          <router-link to="/" class="text-blue-600 hover:underline">
            ユーザ管理・その他
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- メインエリア -->
    <main class="main-area flex-1 p-6">
      <header class="mb-4">
        <h1 class="text-2xl font-bold">こんにちは、{{ userName }} さん</h1>
      </header>

      <!-- お知らせエリア -->
      <section class="notifications bg-white shadow p-4 rounded">
        <h2 class="text-xl font-bold mb-3">お知らせ</h2>
        <ul>
          <li v-for="notice in notices" :key="notice.id" class="mb-3">
            <span class="text-gray-600">{{ notice.date }}</span>
            <p>{{ notice.content }}</p>
            <router-link v-if="notice.link" :to="notice.link" class="text-blue-500 hover:underline">
              詳細
            </router-link>
          </li>
        </ul>
        <router-link to="/" class="text-blue-600 hover:underline"> すべて表示 </router-link>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #f9f9f9;
}

.menu-area {
  min-width: 250px;
}

.main-area {
  max-width: 1024px;
  margin: auto;
}
</style>
