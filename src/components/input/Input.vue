<!-- 親コンポーネントの例
 <Input
  v-model="email"
  :blockSize="'md'"
  :isError="false"
  placeholder="メールアドレスを入力"
  type="email"
/>
 -->
<template>
  <input
    ref="inputRef"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="[
      'max-w-full rounded-8 border bg-white px-4 py-3 text-oln-16N-100 text-solid-gray-800',
      blockSizeStyle[blockSize],
      isError ? 'border-error-1' : 'border-solid-gray-900',
      'focus:outline focus:outline-4 focus:outline-black focus:outline-offset-[calc(2/16*1rem)] focus:ring-[calc(2/16*1rem)] focus:ring-yellow-300',
      'aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420 aria-disabled:pointer-events-none aria-disabled:forced-colors:text-[GrayText] aria-disabled:forced-colors:border-[GrayText]',
      customClass,
    ]"
    :readonly="ariaDisabled ? true : readonly"
    :disabled="disabled"
    :aria-disabled="ariaDisabled"
    v-bind="inputAttrs"
  />
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'

type InputBlockSize = 'lg' | 'md' | 'sm'

const props = defineProps<{
  modelValue: string
  blockSize?: InputBlockSize
  isError?: boolean
  readonly?: boolean
  disabled?: boolean
  ariaDisabled?: boolean
  class?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const blockSize = props.blockSize ?? 'lg'
const customClass = props.class ?? ''

const inputAttrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)

const blockSizeStyle: Record<InputBlockSize, string> = {
  lg: 'h-14',
  md: 'h-12',
  sm: 'h-10',
}
</script>
