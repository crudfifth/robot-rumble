<template>
  <textarea
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :aria-disabled="disabled"
    :readonly="disabled"
    class="rounded-8 max-w-full border bg-white p-4 text-std-16N-170 text-solid-gray-800 focus:outline focus:outline-4 focus:outline-black focus:outline-offset-[calc(2/16*1rem)] focus:ring-[calc(2/16*1rem)] focus:ring-yellow-300 aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420 aria-disabled:pointer-events-none aria-disabled:forced-colors:text-[GrayText] aria-disabled:forced-colors:border-[GrayText]"
    :class="[isError ? 'border-error-1' : 'border-solid-gray-800', customClass]"
    @input="onInput"
  />
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  modelValue: string
  placeholder?: string
  isError?: boolean
  disabled?: boolean
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement | null
  if (target) emit('update:modelValue', target.value)
}
</script>
