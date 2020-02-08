<template>
  <div class="app">
    <transition :name="toggleAnimation">
      <keep-alive exclude="book,collection">
        <router-view/>
      </keep-alive>
    </transition>
      <tab-bar v-if="!$route.meta.hideTab"/>
  </div>
</template>
<script>
import TabBar from './components/TabBar'
export default {
  data () {
    return {
      toggleAnimation: ''
    }
  },
  components: {
    'tab-bar': TabBar
  },
  watch: {
    $route (to, from) {
      if (to.name === 'book' || from.name === 'book') {
        this.toggleAnimation = 'fade'
      } else {
        this.toggleAnimation = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100vw;
  background-color:#f6f6f6;
  overflow-x: hidden;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter-to, .fade-leave {
   opacity: 1;
}

</style>
