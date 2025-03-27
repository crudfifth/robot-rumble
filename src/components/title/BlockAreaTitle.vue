<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <Divider color="gray-536" className="border-t-[3px]" />
  </div>
</template>

<script setup lang="ts">
import Divider from './Divider.vue'

const { title } = defineProps<{
  title: string
}>()
</script>

<style scoped>
.title {
  margin-top: 5px;
  margin-bottom: 10px;
  color: #000;
  font-size: 15pt;
  font-weight: bold;
}
</style>
