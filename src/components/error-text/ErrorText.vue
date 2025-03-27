<!-- 親コンポーネントの例
<ErrorText v-if="!isValidEmail(email)">
  メールアドレスの形式が正しくありません。
</ErrorText>
-->

<script setup lang="ts">
import { useAttrs } from 'vue'

const props = defineProps<{
  class?: string
}>()

const attrs = useAttrs()
const customClass = props.class ?? ''
</script>

<template>
  <p :class="`text-dns-16N-130 text-error-1 ${customClass}`" v-bind="attrs">
    <slot />
  </p>
</template>
