import '@/design/style/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupI18n } from '@/locales/setupI18n'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  await setupI18n(app)

  app.mount('#app')
}

bootstrap().catch()
