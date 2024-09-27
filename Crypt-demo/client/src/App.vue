<template>
  <div id="app">
    <h1>Cryptography Demo</h1>
    <DemoHome />
  </div>
</template>

<script>
import DemoHome from './components/DemoHome.vue';

export default {
  name: 'App',
  components: {
    DemoHome
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
</style>
