<!-- 親コンポーネントの例
<Legend size="lg">
  ログイン
</Legend>
-->
<template>
  <legend
    :class="[
      'flex w-fit items-center gap-2 text-solid-gray-800',
      legendSizeStyle[size],
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </legend>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type LegendSize = 'lg' | 'md' | 'sm'

const props = defineProps<{
  size?: LegendSize
}>()

const size = computed(() => props.size ?? 'md')

const legendSizeStyle: Record<LegendSize, string> = {
  lg: 'text-std-18B-160',
  md: 'text-std-17B-170',
  sm: 'text-std-16B-170',
}
</script>
