<template>
  <div class="story">
    <!-- Header -->
    <m-header>
      <template v-slot:title-text>
        书籍阅读
      </template>
    </m-header>

    <!-- 轮播广告栏 -->
    <swiper-ads class="ads">
      <template v-slot:ad1>
        <img class="ad" src="../assets/images/20200121093728965.jpg" alt="春节狂欢"/>
      </template>
      <template v-slot:ad2>
        <img class="ad" src="../assets/images/20200124011353134.jpg" alt="春节打折"/>
      </template>
    </swiper-ads>

    <!-- 书籍推荐栏 -->
    <recommandations-bar class="recommandations" :booksData="recommandationsData">
      <template v-slot:icon>
        <span class="iconfont icon-xiaoshuo5"></span>
      </template>
      <template v-slot:title>
        好书推荐
      </template>
    </recommandations-bar>

    <!-- 热门书籍列表 -->
    <book-list class="book-list" :booksData="bookListData">
      <template v-slot:icon>
        <span class="iconfont icon-books"></span>
      </template>
      <template v-slot:title>
        热门书籍
      </template>
    </book-list>
  </div>
</template>
<script>
import Header from '../components/Header'
import Ads from '../components/Story/Ads'
import RecommandationsBar from '../components/Story/RecommandationsBar'
import BookList from '../components/Story/BookList'
import api from '../api/api.js'
export default {
  name: 'story',
  data () {
    return {
      no: '',
      bookListData: [],
      recommandationsData: []
    }
  },
  components: {
    'm-header': Header,
    'swiper-ads': Ads,
    RecommandationsBar,
    BookList
  },
  created () {
    api.getBooksById()
      .then(this.$axios.spread((...args) => {
        this.bookListData = args.map((item) => item.data)
      }))
    api.getBooksById(1)
      .then(this.$axios.spread((...args) => {
        this.recommandationsData = args.map((item) => item.data)
      }))
  }
}
</script>
<style lang="scss" scoped>
.story {
  .header {
    z-index: 9;
  }
  .ads {
    padding-top: 10vh;
    img{
      display: block;
      margin: 0 auto;
      border-radius: 2vw;
      box-shadow: 3px 3px 4px 0px #c2c2c2;
      width: 96vw;
    }
  }
}
</style>
