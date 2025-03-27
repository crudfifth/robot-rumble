<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/header/Header.vue'

const route = useRoute()
</script>

<template>
  <div class="font-sans">
    <Header v-if="route.meta.requiresAuth" />
    <RouterView />
  </div>
</template>
