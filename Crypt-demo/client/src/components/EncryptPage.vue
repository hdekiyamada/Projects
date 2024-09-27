<template>
  <div>
    <h2>Encrypt</h2>
    <input v-model="text" placeholder="Enter text to encrypt" />
    <input v-model="key" placeholder="Enter 32-byte encryption key in hex" />
    <button @click="encryptText">Encrypt</button>
    <p>Encrypted Text: {{ encrypted }}</p>
  </div>
</template>

<script>
export default {
  name: 'EncryptPage',
  data() {
    return {
      text: '',
      key: '',
      encrypted: ''
    };
  },
  methods: {
    async encryptText() {
      if (this.key.length !== 64) {
        alert('The key must be 32 bytes (64 hex characters) long.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/cryptography/encrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.text,
            key: this.key
          })
        });
        const data = await response.json();
        this.encrypted = data.encrypted;
        this.$emit('encrypted', this.encrypted);
      } catch (error) {
        console.error('Error encrypting text:', error);
      }
    }
  }
}
</script>
