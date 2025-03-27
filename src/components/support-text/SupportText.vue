<!-- 親コンポーネントの例
<SupportText>
  サポートテキスト
</SupportText>
-->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()

const customClass = props.class ?? ''
</script>
<template>
  <p :class="['text-std-16N-170 text-solid-gray-700', customClass]" v-bind="$attrs">
    <slot />
  </p>
</template>
