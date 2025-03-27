<template>
  <div>
    <table class="w-full min-w-max border-collapse">
      <thead>
        <tr class="bg-solid-gray-50 text-center">
          <!-- ヘッダーのチェックボックス -->
          <th v-if="selectable" class="px-4 py-6 border-b border-black">
            <Checkbox
              id="select-all"
              :model-value="allSelected"
              @update:modelValue="
                (val: boolean) => {
                  allSelected = val
                  toggleAllSelection()
                }
              "
            />
          </th>

          <!-- ヘッダー -->
          <th v-for="header in headers" :key="header" class="px-4 py-6 border-b border-black">
            {{ header }}
          </th>

          <!-- アクションボタンのカラム -->
          <th v-if="actions.length" class="px-4 py-6 border-b border-black"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="even:bg-[#f8f8fb] text-center">
          <!-- 各行のチェックボックス -->
          <td v-if="selectable" class="px-4 py-6 border-b border-solid-gray-420">
            <Checkbox
              :id="`row-${index}`"
              :model-value="selectedRows.includes(row)"
              :value="String(index)"
              @update:modelValue="
                (checked: boolean) => {
                  if (checked) {
                    selectedRows.push(row)
                  } else {
                    selectedRows = selectedRows.filter((r: TableRow) => r !== row)
                  }
                  updateAllSelectedState()
                }
              "
            />
          </td>

          <!-- 各行のデータ -->
          <td
            v-for="header in headers"
            :key="header"
            class="px-4 py-6 border-b border-solid-gray-420"
          >
            {{ row[header] }}
          </td>

          <!-- アクションボタン -->
          <td v-if="actions.length" class="px-4 py-6 border-b border-solid-gray-420">
            <div class="flex justify-center space-x-2">
              <Button
                v-for="(action, idx) in actions"
                :key="idx"
                :text="action.label"
                variant="solid-fill"
                size="md"
                @click="() => action.handler(row)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TableRow, TableAction } from '@/components/table/types'
import Button from '@/components/button/Button.vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'

const props = defineProps<{
  headers: string[]
  rows: TableRow[]
  actions?: TableAction[]
  selectable?: boolean
}>()

const actions = computed(() => props.actions ?? [])
const selectable = computed(() => props.selectable ?? false)
const selectedRows = ref<TableRow[]>([])
const allSelected = ref(false)

const toggleAllSelection = () => {
  if (allSelected.value) {
    selectedRows.value = [...props.rows]
  } else {
    selectedRows.value = []
  }
}

const updateAllSelectedState = () => {
  allSelected.value = selectedRows.value.length === props.rows.length
}

watch(
  () => props.rows,
  () => {
    selectedRows.value = []
    allSelected.value = false
  },
  { deep: true },
)
</script>

<style scoped>
th,
td {
  text-align: center;
}
</style>
