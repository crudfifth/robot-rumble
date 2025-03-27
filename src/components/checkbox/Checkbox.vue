<!-- 親コンポーネント利用例
 <Checkbox
  id="agree"
  v-model="isAgreed"
  :size="'md'"
  :value="'agree'"
 >
  利用規約に同意します
</Checkbox>
 -->

<template>
  <label
    class="flex w-fit items-start"
    :class="[containerSizeStyle[size], hasLabel ? 'py-2' : '']"
    :for="id"
  >
    <span
      class="flex items-center justify-center shrink-0 rounded-[calc(1/8*100%)]"
      :class="checkboxWrapperSizeStyle[size]"
    >
      <input
        ref="checkboxRef"
        :id="id"
        type="checkbox"
        :value="value"
        :checked="modelValue"
        :disabled="disabled"
        :aria-disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        @click="disabled ? handleDisabled : undefined"
        class="appearance-none size-3/4 rounded-[calc(2/18*100%)] bg-white focus:outline focus:outline-4 focus:outline-black focus:outline-offset-[calc(2/16*1rem)] focus:ring-[calc(2/16*1rem)] focus:ring-yellow-300 before:hidden before:size-3.5 before:bg-white before:[clip-path:path('M5.6,11.2L12.65,4.15L11.25,2.75L5.6,8.4L2.75,5.55L1.35,6.95L5.6,11.2Z')] checked:before:block"
        :class="[checkboxSizeStyle[size], isError ? errorClasses : successClasses]"
      />
    </span>
    <span v-if="hasLabel" class="text-solid-gray-800" :class="checkboxLabelSizeStyle[size]">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

type CheckboxSize = 'sm' | 'md' | 'lg'

const props = defineProps<{
  id: string
  modelValue: boolean
  value?: string
  size?: CheckboxSize
  isError?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const size = computed(() => props.size ?? 'sm')
const checkboxRef = ref<HTMLInputElement | null>(null)
const hasLabel = computed(() => !!useSlots().default)

const containerSizeStyle: Record<CheckboxSize, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-2',
}

const checkboxWrapperSizeStyle: Record<CheckboxSize, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-11',
}

const checkboxSizeStyle: Record<CheckboxSize, string> = {
  sm: 'border-[calc(2/16*1rem)]',
  md: 'border-[calc(2/16*1rem)] before:origin-top-left before:scale-[calc(20/14)]',
  lg: 'border-[calc(3/16*1rem)] before:origin-top-left before:scale-[calc(27/14)]',
}

const checkboxLabelSizeStyle: Record<CheckboxSize, string> = {
  sm: 'pt-px text-dns-16N-130',
  md: 'pt-1 text-dns-16N-130',
  lg: 'pt-2.5 text-dns-17N-130',
}

const successClasses =
  'border-solid-gray-600 hover:border-black checked:border-blue-900 checked:bg-blue-900 checked:hover:border-blue-1100 checked:hover:bg-blue-1100'

const errorClasses =
  'border-error-1 hover:border-red-1000 checked:bg-error-1 checked:hover:bg-red-1000'

const handleDisabled = (e: MouseEvent) => {
  e.preventDefault()
}
</script>
