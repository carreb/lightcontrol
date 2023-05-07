import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'

export const SocketInstance = io('http://localhost:1013/lightcontrol')
let VueSocket = new VueSocketIO({
    debug: true,
    connection: SocketInstance
})

let app = createApp(App)

app.use(VueSocket)

app.mount('#app')