<template>
  <hr :class="computedClass" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type DividerColor = 'gray-420' | 'gray-536' | 'black'

const DividerColorStyle: { [key in DividerColor]: string } = {
  'gray-420': 'border-solid-gray-420',
  'gray-536': 'border-solid-gray-536',
  black: 'border-black',
}

const props = defineProps<{
  color?: DividerColor
  className?: string
}>()

const computedClass = computed(() => {
  return `${DividerColorStyle[props.color ?? 'gray-420']} ${props.className ?? ''}`
})
/*
親コンポで下記要領で使用すると線が引ける(デジ庁デザイン)。
<Divider />
<Divider color="gray-536" />
<Divider color="black" />
<Divider className="border-t-2" />
<Divider color="gray-536" className="border-t-2" />
<Divider color="black" className="border-t-2" />
<Divider className="border-t-[3px]" />
<Divider color="gray-536" className="border-t-[3px]" />
<Divider color="black" className="border-t-[3px]" />
<Divider className="border-t-4" />
<Divider color="gray-536" className="border-t-4" />
<Divider color="black" className="border-t-4" />
<Divider className="border-t-8" />
<Divider color="gray-536" className="border-t-8" />
<Divider color="black" className="border-t-8" />
*/
</script>
