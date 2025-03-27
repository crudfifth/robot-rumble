<template>
  <div class="search-form">
    <div class="fields-container">
      <div v-for="(field, index) in fields" :key="index" class="form-group">
        <label v-if="field.label" class="form-label">{{ field.label }}</label>

        <!-- テキスト入力 -->
        <Input
          v-if="field.type === 'text'"
          v-model="formData[field.model] as string"
          :id="`text-${field.model}`"
        />

        <!-- セレクトボックス -->
        <Select
          v-else-if="field.type === 'select'"
          v-model="formData[field.model] as string"
          :id="`select-${field.model}`"
        >
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </Select>

        <!-- ラジオボタン -->
        <RadioGroup
          v-else-if="field.type === 'radio'"
          :options="field.options?.map((opt: string) => ({ label: opt, value: opt })) ?? []"
          :modelValue="formData[field.model] as string"
          :name="field.model"
          @update:modelValue="(val: string) => (formData[field.model] = val)"
        />

        <!-- チェックボックス -->
        <div v-else-if="field.type === 'checkbox'">
          <Checkbox
            v-for="option in field.options"
            :key="option"
            :id="`checkbox-${field.model}-${option}`"
            :value="option"
            :modelValue="(formData[field.model] as string[]).includes(option)"
            @update:modelValue="(checked: boolean) => updateCheckbox(field.model, option, checked)"
          >
            {{ option }}
          </Checkbox>
        </div>

        <!-- 日付 -->
        <VueDatePicker
          v-else-if="field.type === 'date'"
          v-model="formData[field.model]"
          :id="`date-${field.model}`"
          :format="'yyyy-MM-dd'"
          auto-apply
        />
      </div>
    </div>

    <!-- 検索ボタン -->
    <div class="search-button-container">
      <Button text="検索" variant="solid-fill" size="md" @click="handleSearch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/button/Button.vue'
import Input from '@/components/input/Input.vue'
import Select from '@/components/select/Select.vue'
import RadioGroup from '@/components/radio/RadioGroup.vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export interface FieldConfig {
  label: string
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'date'
  options?: string[]
  model: string
}

const props = defineProps<{ fields: FieldConfig[] }>()
const emit = defineEmits<{
  (e: 'search', value: Record<string, string | string[] | Date | null>): void
}>()

const formData = ref<Record<string, string | string[] | Date | null>>({})

watch(
  () => props.fields,
  (newFields) => {
    newFields.forEach((field) => {
      if (!(field.model in formData.value)) {
        if (field.type === 'checkbox') {
          formData.value[field.model] = []
        } else if (field.type === 'date') {
          formData.value[field.model] = null
        } else {
          formData.value[field.model] = ''
        }
      }
    })
  },
  { immediate: true },
)

const updateCheckbox = (model: string, value: string, checked: boolean) => {
  const checkboxArray = (formData.value[model] as string[]) ?? []
  formData.value[model] = checked
    ? [...checkboxArray, value]
    : checkboxArray.filter((v) => v !== value)
}

const handleSearch = () => {
  emit('search', formData.value)
}
</script>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
}
.fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-label {
  font-weight: bold;
}
.search-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
