<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2>ようこそ</h2>
    <p>これはVue.js + Viteで作成されたデモアプリケーションです。</p>
    <router-link to="/sample/files" class="button"> ファイル管理を見る </router-link>
    <br />
    <router-link to="/sample/users" class="button"> ユーザ管理を見る </router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
}

.button:hover {
  background-color: #3aa876;
}
</style>
