<template>
  <div>
    <div v-if="connected && !registered">
      <h1>Please choose a username</h1>
      <p>The username must be at least 3 characters in length</p>
      <input type="text" v-model="username" @keypress.enter="usernameRegister" />
      <button @click="usernameRegister">Submit</button>
    </div>

    <div v-if="!connected">
      <h1>Socket disconnected</h1>
      <p>Try refreshing the page?</p>
    </div>
    
    <LightController v-if="registered && connected" :connected="connected" :registered="registered" :username="username" :users="users" />

  </div>
</template>

<script>
import io from 'socket.io-client';
import LightController from './components/LightController.vue';

  export default {
    name: 'App',
    data() {
      return {
        socket: null,
        connected: false,
        users: [],
        username: '',
        registered: false,
      }
    },
    components: {
      LightController
    },
    methods: {
      usernameRegister() {
        this.$socket.emit('register', { name: this.username})
      }
    },
    sockets: {
      connect() {
        this.connected = true;
        this.$socket.emit('test');
      },
      disconnect() {
        this.connected = false;
      },
      users(users) {
        this.users = users;
      },
      registered() {
        this.registered = true;
      }
    },
  }
</script>

<style lang="css" scoped>

</style>