<!--
 親コンポーネント利用例
 <CheckboxGroup
  label="ロール"
  v-model="roles"
  :options="[
    { label: '自治体', value: '自治体' },
    { label: '代理登録機関(自治体)', value: '代理登録機関(自治体)' }
  ]"
  size="md"
/>
-->

<template>
  <fieldset class="flex flex-col gap-2">
    <legend v-if="label" class="mb-1 font-bold text-dns-16N-130">{{ label }}</legend>
    <Checkbox
      v-for="option in options"
      :key="option.value"
      :id="`${groupId}-${option.value}`"
      :value="option.value"
      :modelValue="modelValue.includes(option.value)"
      :size="size"
      :isError="isError"
      @update:modelValue="handleChange(option.value, $event)"
    >
      {{ option.label }}
    </Checkbox>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'

type CheckboxSize = 'sm' | 'md' | 'lg'

const props = defineProps<{
  label?: string
  modelValue: string[]
  options: { label: string; value: string }[]
  size?: CheckboxSize
  isError?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const size = computed(() => props.size ?? 'sm')

const groupId = Math.random().toString(36).substring(2, 8)

const handleChange = (value: string, checked: boolean) => {
  const current = new Set(props.modelValue)
  if (checked) {
    current.add(value)
  } else {
    current.delete(value)
  }
  emit('update:modelValue', Array.from(current))
}
</script>
