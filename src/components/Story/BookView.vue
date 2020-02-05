<template>
  <div class="book-view">
    <img class="cover" :src="SRC" alt="书籍封面">
    <div class="info">
      <h2 class="title"><slot name="title"/></h2>
      <h3 class="author"><slot name="author"/></h3>
      <p class="intro"><slot name="intro"/></p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    SRC: String
  }
}
</script>
<style lang="scss" scoped>
.book-view {
  padding-left: 3vw;
  width: 100vw;
  .cover {
    margin-bottom: 2vh;
    width: 10vh;
    display: inline-block;
    vertical-align: top;
  }
  .info {
    display: inline-block;
    width: calc(94vw - 10vh);
    padding-top: 2vw;
    padding-left: 2vw;
    .title {
      color: #d38e8eda;
      font-size: 2vh;
      // font-family: 'Microsoft Yahei';
    }
    .author {
      font-size: 1.8vh;
      margin-top: 1vh;
      color: #bcbcbc;
    }
    .intro {
      text-overflow:ellipsis;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #bcbcbc;
      font-size: 1.8vh;
      margin-top: 1.6vh;
    }
  }
}
</style>
