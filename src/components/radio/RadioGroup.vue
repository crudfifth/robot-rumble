<script setup lang="ts">
import { computed } from 'vue'
import Radio from './Radio.vue'

type RadioSize = 'sm' | 'md' | 'lg'

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  options: Option[]
  modelValue: string
  name?: string
  size?: RadioSize
  isError?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const groupId = computed(() => props.name ?? 'radio-group')
</script>

<template>
  <div class="flex flex-wrap gap-x-4 gap-y-2">
    <Radio
      v-for="option in options"
      :key="option.value"
      :id="`${groupId}-${option.value}`"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      :size="size"
      :isError="isError"
      :disabled="disabled"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      {{ option.label }}
    </Radio>
  </div>
</template>
