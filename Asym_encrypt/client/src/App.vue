<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<template>
  <div id="app">
    <h1>Asymmetric Encryption Demo</h1>
    <button @click="generateKeys">Generate Keys</button>
    <p v-if="publicKey">Public Key: {{ publicKey }}</p>
    
    <div v-if="publicKey">
      <h2>Encrypt Message</h2>
      <input v-model="message" placeholder="Enter message to encrypt" />
      <button @click="encryptMessage">Encrypt</button>
      <p v-if="encryptedMessage">Encrypted Message: {{ encryptedMessage }}</p>
    </div>

    <div v-if="encryptedMessage">
      <h2>Decrypt Message</h2>
      <button @click="decryptMessage">Decrypt</button>
      <p v-if="decryptedMessage">Decrypted Message: {{ decryptedMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicKey: '',
      message: '',
      encryptedMessage: '',
      decryptedMessage: ''
    };
  },
  methods: {
    async generateKeys() {
      const response = await fetch('http://localhost:3000/generate-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.publicKey = data.publicKey;
    },
    async encryptMessage() {
      const response = await fetch('http://localhost:3000/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.message })
      });
      const data = await response.json();
      this.encryptedMessage = data.encryptedMessage;
    },
    async decryptMessage() {
      const response = await fetch('http://localhost:3000/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedMessage: this.encryptedMessage })
      });
      const data = await response.json();
      this.decryptedMessage = data.decryptedMessage;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
