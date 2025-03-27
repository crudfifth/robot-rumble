<!-- 親コンポーネントの例
  <Link href="https://example.com" target="_blank">
    外部サイトはこちら
  </Link>
-->
<template>
  <a
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="[linkStyle, props.class ?? '']"
    v-bind="$attrs"
  >
    <slot />
    <svg
      v-if="target === '_blank'"
      aria-label="新規タブで開きます"
      role="img"
      class="mb-[calc(3/16*1rem)] ml-[calc(3/16*1rem)] inline"
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
    >
      <g>
        <path
          clip-rule="evenodd"
          d="M3 13.5H13V9.16667H14V14.5H2V2.5H7.33333V3.5H3V13.5ZM9.33333 3.5V2.5H14V7.16667H13V4.23333L7 10.1667L6.33333 9.5L12.2667 3.5H9.33333Z"
          fill-rule="evenodd"
          fill="currentColor"
        />
      </g>
    </svg>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string
  target?: '_blank' | '_self'
  class?: string
}>()

const linkStyle = `
  text-blue-1000 underline underline-offset-[calc(3/16*1rem)]
  visited:text-magenta-900
  hover:text-blue-1000 hover:decoration-[calc(3/16*1rem)]
  focus-visible:rounded-4 focus-visible:outline focus-visible:outline-4 focus-visible:outline-black
  focus-visible:outline-offset-[calc(2/16*1rem)]
  focus-visible:bg-yellow-300 focus-visible:text-blue-1000
  focus-visible:ring-[calc(2/16*1rem)] focus-visible:ring-yellow-300
  active:text-orange-700 active:decoration-1
`
</script>
