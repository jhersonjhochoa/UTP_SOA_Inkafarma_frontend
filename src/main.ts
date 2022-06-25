import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import VueAxios from 'vue-axios'
import axios from 'axios'


createApp(App)
.use(router)
.use(VueAxios, axios)
.mount('#app')
