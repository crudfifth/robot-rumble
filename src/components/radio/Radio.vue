<template>
  <label
    class="flex w-fit items-start"
    :class="[containerSizeStyle[size], hasLabel ? 'py-2' : '']"
    :for="id"
  >
    <span
      class="flex items-center justify-center shrink-0 rounded-full"
      :class="radioWrapperSizeStyle[size]"
    >
      <input
        :id="id"
        ref="radioRef"
        type="radio"
        class="appearance-none rounded-full bg-white focus:outline focus:outline-4 focus:outline-black focus:outline-offset-[calc(2/16*1rem)] focus:ring-[calc(2/16*1rem)] focus:ring-yellow-300 before:hidden before:size-full before:bg-white before:[clip-path:circle(calc(5/16*100%))] checked:before:block aria-disabled:!border-solid-gray-300 aria-disabled:!bg-solid-gray-50 aria-disabled:checked:before:!bg-solid-gray-300 forced-colors:checked:before:!bg-[CanvasText] forced-colors:aria-disabled:!border-[GrayText] forced-colors:aria-disabled:checked:before:!bg-[GrayText]"
        :class="[radioSizeStyle[size], isError ? errorClasses : successClasses]"
        :value="value"
        :name="name"
        :disabled="disabled"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
        :aria-disabled="disabled"
        @click="disabled ? handleDisabled : undefined"
      />
    </span>
    <span v-if="hasLabel" class="text-solid-gray-800" :class="radioLabelSizeStyle[size]">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

type RadioSize = 'sm' | 'md' | 'lg'

const props = defineProps<{
  id: string
  modelValue: string
  value: string
  name?: string
  size?: RadioSize
  isError?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const size = computed(() => props.size ?? 'sm')

const radioRef = ref<HTMLInputElement | null>(null)

const hasLabel = computed(() => !!useSlots().default)

const containerSizeStyle: Record<RadioSize, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
}

const radioWrapperSizeStyle: Record<RadioSize, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-11',
}

const radioSizeStyle: Record<RadioSize, string> = {
  sm: 'border-[calc(2/16*1rem)] size-[calc(5/6*100%)]',
  md: 'border-[calc(2/16*1rem)] size-[calc(5/6*100%)]',
  lg: 'border-[calc(3/16*1rem)] size-[calc(5/6*100%)]',
}

const radioLabelSizeStyle: Record<RadioSize, string> = {
  sm: 'pt-px text-dns-16N-130',
  md: 'pt-1 text-dns-16N-130',
  lg: 'pt-2.5 text-dns-17N-130',
}

const successClasses =
  'border-solid-gray-600 hover:border-black checked:border-blue-900 checked:before:bg-blue-900 checked:hover:border-blue-1100 checked:hover:before:bg-blue-1100'

const errorClasses =
  'border-error-1 hover:border-red-1000 checked:before:bg-error-1 checked:hover:before:bg-red-1000'

const handleDisabled = (e: MouseEvent) => {
  e.preventDefault()
}
</script>
