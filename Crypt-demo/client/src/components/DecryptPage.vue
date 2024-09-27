<template>
  <div>
    <h2>Decrypt</h2>
    <input v-model="key" placeholder="Enter 32-byte decryption key in hex" />
    <button @click="decryptText">Decrypt</button>
    <p>Decrypted Text: {{ decrypted }}</p>
  </div>
</template>

<script>
export default {
  name: 'DecryptPage',
  props: ['encrypted'],
  data() {
    return {
      key: '',
      decrypted: ''
    };
  },
  methods: {
    async decryptText() {
      if (this.key.length !== 64) {
        alert('The key must be 32 bytes (64 hex characters) long.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/cryptography/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            encrypted: this.encrypted,
            key: this.key
          })
        });
        const data = await response.json();
        this.decrypted = data.decrypted;
      } catch (error) {
        console.error('Error decrypting text:', error);
      }
    }
  }
}
</script>
