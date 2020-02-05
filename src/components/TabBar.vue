<template>
    <div class="tab-bar">
       <mt-tabbar v-model='selected' fixed>
            <mt-tab-item id="story">
                <h3 class="iconfont icon-icon25"></h3>
                故事
            </mt-tab-item>
            <mt-tab-item id="login">
                <img slot="icon" src="../assets/logo.png">
                儿歌
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="../assets/logo.png">
                游戏
            </mt-tab-item>
            <mt-tab-item id="collection">
                <img slot="icon" src="../assets/logo.png">
                收集
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selected: 'story'
    }
  },
  watch: {
    selected (to, from) {
      this.$router.push(`${to}`)
    }
  }
}
</script>>
<style lang="scss" scoped>
  .tab-bar{
    height: 55px;
    .mint-tabbar {
      box-shadow: 0 -2px 10px 0px rgba(0, 0, 0, 0.08);
      .mint-tab-item {
        color: #757575;
      &.is-selected {
        background: inherit;
        color: #f94040;
      }
      h3 {
        font-size: 28px;
      }
      }
    }
  }
</style>
