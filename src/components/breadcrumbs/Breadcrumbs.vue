<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const breadcrumbs = ref<{ label: string; path: string }[]>([
  { label: 'ホーム', path: '/dashboard' },
])

watch(
  () => route.path,
  (newPath = '') => {
    const pageLabel = String(route.meta.title || route.name)
    const pagePath = route.path

    if (pagePath === '/dashboard' && breadcrumbs.value.length > 1) {
      breadcrumbs.value = [{ label: 'ホーム', path: '/dashboard' }]
      return
    }

    const existingIndex = breadcrumbs.value.findIndex((crumb) => crumb.path === pagePath)
    if (existingIndex === -1) {
      breadcrumbs.value.push({ label: pageLabel, path: pagePath })
    }

    breadcrumbs.value = breadcrumbs.value.filter((crumb) => {
      return newPath.startsWith(crumb.path) || crumb.path === '/dashboard'
    })
  },
  { immediate: true },
)

const goTo = (path: string) => {
  router.push(path)
}

const isLast = (index: number) => index === breadcrumbs.value.length - 1
</script>

<template>
  <nav class="bg-gray-200 p-2 text-sm flex items-center">
    <ol class="inline-flex items-center space-x-2">
      <li>
        <button
          class="text-blue-1000 text-oln-16N-100 underline underline-offset-[calc(3/16*1rem)] hover:text-blue-900 hover:decoration-[calc(3/16*1rem)] active:text-orange-700 active:decoration-1 focus-visible:rounded-4 focus-visible:outline focus-visible:outline-4 focus-visible:outline-black focus-visible:outline-offset-[calc(2/16*1rem)] focus-visible:bg-yellow-300 focus-visible:text-blue-1000 focus-visible:ring-[calc(2/16*1rem)] focus-visible:ring-yellow-300"
          @click="goTo('/dashboard')"
        >
          ホーム
        </button>
      </li>
      <template v-for="(crumb, index) in breadcrumbs.slice(1)" :key="index">
        <li class="inline mx-2">
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.50078 1.2998L3.80078 1.9998L7.80078 5.9998L3.80078 9.9998L4.50078 10.6998L9.20078 5.9998L4.50078 1.2998Z"
              fill="currentColor"
            />
          </svg>
        </li>
        <li v-if="!isLast(index + 1)">
          <button
            class="text-blue-1000 text-oln-16N-100 underline underline-offset-[calc(3/16*1rem)] hover:text-blue-900 hover:decoration-[calc(3/16*1rem)] active:text-orange-700 active:decoration-1 focus-visible:rounded-4 focus-visible:outline focus-visible:outline-4 focus-visible:outline-black focus-visible:outline-offset-[calc(2/16*1rem)] focus-visible:bg-yellow-300 focus-visible:text-blue-1000 focus-visible:ring-[calc(2/16*1rem)] focus-visible:ring-yellow-300"
            @click="goTo(crumb.path)"
          >
            {{ crumb.label }}
          </button>
        </li>
        <li v-else class="text-gray-500 text-oln-16N-100" aria-current="page">{{ crumb.label }}</li>
      </template>
    </ol>
  </nav>
</template>
