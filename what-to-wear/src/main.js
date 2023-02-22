import { createApp } from 'vue'
import Vue3Storage, { StorageType } from "vue3-storage";
import './style.css'
import router from './router'
import App from './App.vue'

createApp(App)
    .use(router, Vue3Storage, { namespace: "pro_", storage: StorageType.Local })
    .mount('#app')

