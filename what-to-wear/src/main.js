import { createApp } from 'vue'
import Vue3Storage, { StorageType } from "vue3-storage";
import router from './router'
import App from './App.vue'

import './style.css'

createApp(App)
    .use(router, Vue3Storage, { namespace: "pro_", storage: StorageType.Local })
    .mount('#app')

