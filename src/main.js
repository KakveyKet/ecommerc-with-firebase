import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/main.css"
import { projectAuth } from './firebase/config'
import i18n from './i18n'
let app;
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        createApp(App).use(i18n).use(router).mount('#app')
    }
})
