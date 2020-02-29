<template>
  <loading v-if="!isLoaded"/>
  <div v-else class="catalogue">
    <div>
      <m-header :title="bookTitle">
      <template v-slot:left>
          <span class="iconfont icon-fanhui" @touchend="$router.go(-1)"/>
      </template>
      </m-header>
      <div class="info">
      <span class="count">共{{chapters.length}}章</span>
      <span class="sort" @click="reverse">
          <span class="iconfont icon-daoxu"/>
          <span v-if="ascOrder">倒序</span>
          <span v-if="!ascOrder">正序</span>
      </span>
      </div>
      <ul>
          <li class="chapters" v-for="(item, index) of chapters" :key="index">
          <router-link :to="{name: 'reader',query:{bookId:$route.query.bookId,chapter:index+1}}">
              {{ item.order }}&nbsp;{{ item.title }}
          </router-link>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '../api/api.js'
import Header from '../components/Header'
import Loading from '../components/Loading'
export default {
  name: 'catalogue',
  data () {
    return {
      bookId: this.$route.query.bookId,
      bookTitle: '',
      chapters: [],
      ascOrder: true,
      isLoaded: false
    }
  },
  components: {
    'm-header': Header,
    Loading
  },
  created () {
    this.getBookById(this.bookId)
  },
  methods: {
    // 书籍信息
    getBookById: function (bookId) {
      api.getBookById(bookId)
        .then(res => {
          this.bookTitle = res.data.title
          this.getBookSources(bookId)
          // console.log('书籍信息', res.data)
        })
    },
    // 获取书源
    getBookSources: function (bookId) {
      api.getBookSources(bookId)
        .then(res => {
          this.getBookChapters(res.data[0]._id)
          // console.log('书籍信息', res.data)
        })
    },
    // 根据书源获取章节
    getBookChapters: function (sourceId) {
      api.getBookChapters(sourceId)
        .then(res => {
          this.chapters = res.data.chapters
          console.log(this.chapters)
          this.isLoaded = true
        })
    },
    reverse: function () {
      this.chapters = this.chapters.reverse()
      this.ascOrder = !this.ascOrder
    }
  }
}
</script>
<style lang="scss" scoped>
.catalogue {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: calc(#{$HeaderHeight} + 35px);
  height: calc(93vh - 25px);
  .info {
    position: fixed;
    top: 8vh;
    height: 30px;
    width: 100vw;
    background: #f6f6f6;
    span {
      font-size: 16px;
      &.count {
        color: #999;
        padding: 10px;
      }
      &.sort {
        color: #222;
        padding: 10px;
        position: relative;
        left: calc(100vw - 158px);
      }
    }
  }
  ul {
    padding-top: 5px;
    margin-left: 5vw;
    li {
      padding-bottom: 34px;
      a {
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #999;
        // color: #999;
      }
    }
  }
}
</style>
