<template lang="pug">
router-view(:key='$route.fullPath', style='height: 800px')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  overflow-y: auto;
}

</style>
