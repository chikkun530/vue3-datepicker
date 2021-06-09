import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
const app = createApp(App);
window.app = app.mount('#app')
