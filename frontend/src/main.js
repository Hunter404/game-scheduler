import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { loadFonts } from './plugins/webfontloader'
import vuetify from './plugins/vuetify'
import router from '@/router'

import App from './App.vue'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
