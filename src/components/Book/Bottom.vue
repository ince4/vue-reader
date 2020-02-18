<template>
  <div class="bottom">
     <div class="buttons">
        <button id="store-up" :class="{'collected':collected,'':!collected}">
            <span class="iconfont"
            :class="{'icon-gou':collected, 'icon-pictrue-add':!collected}"/>
            <span v-if="!collected" @click="storeUp">加入书架</span>
            <span v-else @click="cancel">已在书架</span>
        </button>
          <button id="read" @touchend="goToReader">立即阅读</button>
      </div>
      <!-- {{bookData}} -->
  </div>
</template>
<script>
export default {
  props: {
    bookData: Object
  },
  created () {
    this.$store.commit('isCollected', this.bookData)
  },
  computed: {
    collected () {
      return this.$store.state.collected
    }
  },
  methods: {
    goToReader: function () {
      this.$router.push({ name: 'reader', query: { bookId: this.bookData._id, chapter: 1 } })
    },
    storeUp: function () {
      this.$store.commit('addToCollections', this.bookData)
      console.log(this.$store.state.bookCollections)
    },
    cancel: function () {
      this.$store.commit('removeFromCollections', this.bookData)
      console.log(this.$store.state.bookCollections)
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom {
  // height: 8vh;
  .buttons {
    background-color:#f6f6f6;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -2px 10px 0px rgba(0, 0, 0, 0.08);
    width: 100vw;
    height: 8vh;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    #store-up {
      border: 1px solid transparent;
      outline: none;
      font-size: 2.2vh;
      background: inherit;
      color: #222;
      &.collected {
        color: #9c9c9c;
      }
      span {
        font-size: 2.2vh;
      }
    }
    #read {
      background: rgb(231, 80, 80);
      box-shadow: 0 2px 8px 0px rgba(231, 80, 80, 0.589);
      border: 0;
      padding: 2vh;
      font-size: 2.2vh;
      width: 17vh;
      height: 6vh;
      line-height: 2.2vh;
      border-radius: 6vh;
      color: #f0f0f0;
      outline: none;
    }
  }
}
</style>
