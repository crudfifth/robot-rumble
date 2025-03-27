<!-- 親コンポーネントの例
<Ul>
  <li>アイテム１</li>
  <li>アイテム２</li>
  <li>アイテム３</li>
</Ul>
-->
<script setup lang="ts">
import { computed } from 'vue'

const ulStyle = 'pl-8 list-[revert]'
</script>
<template>
  <ul :class="[ulStyle, $attrs.class]" v-bind="$attrs">
    <slot />
  </ul>
</template>
