<template>
  <div>
    <Encrypt @encrypted="setEncrypted" />
    <Decrypt :encrypted="encrypted" />
  </div>
</template>

<script>
import Encrypt from './EncryptPage.vue';
import Decrypt from './DecryptPage.vue';

export default {
  name: 'DemoHome',
  components: {
    Encrypt,
    Decrypt
  },
  data() {
    return {
      encrypted: ''
    };
  },
  methods: {
    setEncrypted(encrypted) {
      this.encrypted = encrypted;
    }
  }
}
</script>
