import { createApp } from 'vue'
import App from './App.vue'
import '@/usecases/shared/styles/fonts.css'
import '@/usecases/shared/styles/style.css'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { worker } from './mocks/browser'
import router from '@/usecases/shared/router/index.ts'

const startMockServiceWorker = async () => {
  if (import.meta.env.MODE === 'development') {
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js', options: { scope: '/' } } })
  }
}

startMockServiceWorker()

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.mount('#app')
