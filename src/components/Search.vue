<template>
  <div class="search">
    <div class="header">
      <div class="searchBar">
        <input ref="input" @blur="stopSearching" type="text" placeholder="输入关键词">
        <div class="searchBtn" @click="keyWordsSearch">
            搜索
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    stopSearching: function () {
      this.$emit('stopSearching')
    },
    keyWordsSearch: function () {

    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  .header {
    width: 100vw;
    height: $HeaderHeight;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    background: #f94040;
    box-shadow: 0 2px 6px 0px #f94040;
    .searchBar {
      display: flex;
      height: inherit;
      justify-content: space-between;
      align-items: center;
      width: 90vw;
      margin: 0 auto;
      input {
      width: 75vw;
      height: 20px;
      display: inline-block;
      outline-style: none ;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 2px;
      font-size: 14px;
      color: rgb(148, 148, 148);
      &::-webkit-input-placeholder {
        color: rgb(148, 148, 148);
      }
      &::-moz-input-placeholder {
        color: rgb(148, 148, 148);
      }
      &::-ms-input-input-placeholder {
        color: rgb(148, 148, 148);
      }

      }
      .searchBtn {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: rgb(247, 247, 247);
      }
    }
  }
}
</style>
