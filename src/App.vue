<template>
  <div class="app">
    <transition :name="toggleAnimation" mode="out-in">
      <keep-alive exclude="book,collection,reader">
        <router-view/>
      </keep-alive>
    </transition>
    <transition :name="toggleAnimation">
      <keep-alive>
        <tab-bar v-if="!$route.meta.hideTab"/>
      </keep-alive>
    </transition>
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
      if (to.name === 'book') {
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
  width: 100vw;
  overflow-x: hidden;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active {
  transition: all .1s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter-to, .fade-leave {
   opacity: 1;
}

</style>
