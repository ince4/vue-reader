<template>
  <div class="app">
    <router-view/>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from './components/TabBar'
export default {
  components: {
    'tab-bar': TabBar
  }
}
</script>
<style lang="scss" scoped>
  .app {
    // height: 100vh;
    width: 100vw;
    background-color:#f6f6f6;
    overflow-x: hidden;
  }
</style>
