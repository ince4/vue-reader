<template>
  <div class="wrap">
    <loading v-if="!isLoaded"/>
    <div class="story" ref="story" v-else>
      <!-- Header -->
      <m-header  v-if="!isSearching">
        <template v-slot:left>
          书籍推荐
        </template>
        <template v-slot:right>
          <span class="iconfont icon-sousuo1" @click="searchBoxToggle"/>
        </template>
      </m-header>
      <!-- 搜索 -->
      <search v-else @stopSearching="searchBoxToggle"></search>
      <!-- 广告轮播 -->
      <swiper-ads class="ads">
        <template v-slot:ad1>
          <img class="ad" src="../assets/images/20200121093728965.jpg" alt="春节狂欢"/>
        </template>
        <template v-slot:ad2>
          <img class="ad" src="../assets/images/20200124011353134.jpg" alt="春节打折"/>
        </template>
      </swiper-ads>
      <!-- 推荐栏 -->
      <recommandations-bar :booksData="recommandationsData">
        <template v-slot:icon>
          <span class="iconfont icon-xiaoshuo5"></span>
        </template>
        <template v-slot:title>
          主编力推
        </template>
      </recommandations-bar>
      <!-- 书籍列表 -->
      <book-list :booksData="bookListData1" :listLength="3">
        <template v-slot:icon>
          <span class="iconfont icon-changxiaopaiming"></span>
        </template>
        <template v-slot:title>
          畅销精选
        </template>
      </book-list>
      <!-- bar -->
      <aside>
        <img src="../assets/images/20190301073429442.jpg" alt="书单">
      </aside>
      <!-- 推荐书籍轮播 -->
      <book-swiper :booksData="bookListData2">
        <template v-slot:icon>
          <span class="iconfont icon-books"></span>
        </template>
        <template v-slot:title>
          潜力新书
        </template>
      </book-swiper>
      <book-swiper :booksData="bookListData3">
        <template v-slot:icon>
          <span class="iconfont icon-tuijian1"></span>
        </template>
        <template v-slot:title>
          最近更新
        </template>
      </book-swiper>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header'
import Search from '../components/Search'
import Ads from '../components/Story/Ads'
import RecommandationsBar from '../components/Story/RecommandationsBar'
import BookList from '../components/BookList'
import BookSwiper from '../components/Story/BookSwiper'
import Loading from '../components/Loading'
import api from '../api/api.js'
export default {
  name: 'story',
  data () {
    return {
      isLoaded: false,
      rankings: [], // 排行榜种类
      recommandationsData: [],
      bookListData1: [],
      bookListData2: [],
      bookListData3: [],
      scroll: 0,
      isSearching: false
    }
  },
  components: {
    'm-header': Header,
    'swiper-ads': Ads,
    RecommandationsBar,
    BookList,
    BookSwiper,
    Loading,
    Search
  },
  methods: {
    // 请求相应排行榜下的书籍
    searchRankingBooksById: function () {
      return [
        api.getRankingBooks(this.rankings.male[5]._id), // 主编力推
        api.getRankingBooks(this.rankings.male[8]._id), // 畅销精选
        api.getRankingBooks(this.rankings.male[3]._id), // 潜力新书
        api.getRankingBooks(this.rankings.male[10]._id) // 最近更新
      ]
    },
    searchBoxToggle: function () {
      this.isSearching = !this.isSearching
    }
  },
  created () {
    // 获取排行榜类型
    api.getRankingId()
      .then(res => {
        this.rankings = res.data
      })
      .then(() => {
        // 根据id获取排行榜书籍
        this.$axios.all(this.searchRankingBooksById())
          .then(this.$axios.spread((recRes, bookList1, bookList2, bookList3) => {
            this.recommandationsData = recRes.data.ranking.books // 主编力推
            this.bookListData1 = bookList1.data.ranking.books // 畅销精选
            this.bookListData2 = bookList2.data.ranking.books // 潜力新书
            this.bookListData3 = bookList3.data.ranking.books // 最近更新
            this.isLoaded = true
          }))
          .catch((res) => {
            console.log('Error', res)
          })
      })
  },
  activated () {
    if (this.scroll !== 0) {
      this.$refs.story.scrollTop = this.scroll
    }
    // console.log(this.scroll)
  },
  beforeRouteLeave (to, from, next) {
    if (this.isLoaded) {
      this.scroll = this.$refs.story.scrollTop
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
.story {
  // touch-action: pan-y;
  @include wrap-scroll;
  .header {
    z-index: 9;
  }
  .ads {
    padding-top: 1.5vh;
    img{
      display: block;
      margin: 0 auto;
      border-radius: 2vw;
      box-shadow: 3px 3px 4px 0px #c2c2c2;
      width: 96vw;
    }
  }
  aside {
    img{
      display: block;
      margin: 0 auto;
      border-radius: 2vw;
      box-shadow: 1px 1px 4px 0px #c2c2c2;
      width: 96vw;
      margin-bottom: 3vh;
    }
  }
}
</style>
