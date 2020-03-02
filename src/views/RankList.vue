<template>
  <div class="ranklist">
    <div>
      <!-- header -->
      <m-header v-if="!isSearching">
        <template v-slot:left>
          排行
        </template>
        <template v-slot:right>
          <span class="iconfont icon-sousuo1"/>
        </template>
      </m-header>
      <!-- 搜索 -->
      <search v-else @stopSearching="searchBoxToggle"></search>
      <div class="wrapper">
        <div class="rankType">
          <div
          @click="changeType(index)"
          class="tags"
          :class="{'selected': index === activeIndex}"
          v-for="(item, index) of rankType"
          :key="index">
            {{item.shortTitle}}
          </div>
        </div>
        <loading v-if="!isLoaded"/>
        <div class="books" v-else>
          <book-list :booksData="booksData" :listLength="booksData.length"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import Search from '../components/Search'
import BookList from '../components/BookList'
import api from '../api/api.js'
export default {
  name: 'ranklist',
  data () {
    return {
      isLoaded: false,
      rankType: [],
      booksData: [],
      activeIndex: 0,
      isSearching: false
    }
  },
  created () {
    this.getRankingId(this.activeIndex)
  },
  components: {
    'm-header': Header,
    Loading,
    BookList,
    Search
  },
  methods: {
    getRankingId: function (index) {
      api.getRankingId()
        .then(res => {
          console.log(res.data)
          this.rankType = res.data.male.slice(0, 5)
          this.getRankingBooks(this.rankType[index]._id)
        })
    },
    getRankingBooks: function (id) {
      api.getRankingBooks(id)
        .then(res => {
          this.booksData = res.data.ranking.books
          this.isLoaded = true
          console.log(this.booksData)
        })
    },
    changeType: function (index) {
      this.isLoaded = false
      this.activeIndex = index
      this.getRankingId(this.activeIndex)
    },
    searchBoxToggle: function () {
      this.isSearching = !this.isSearching
    }
  }
}
</script>
<style lang="scss" scoped>
.ranklist {
  margin-top: $HeaderHeight;
  height: calc( 100vh - #{$tabBarHeight} - #{$HeaderHeight} );
  overflow-y: hidden;
  .wrapper {
    display: flex;
    .rankType {
      height: 100vh;
      width: 20vw;
      display: flex;
      border-right: 2px solid rgba(221, 221, 221, 0.616);
      flex-direction: column;
      flex-shrink: 0;
      .tags {
        font-size: 2.2vh;
        height: 5vh;
        line-height: 5vh;
        width: 100%;
        text-align: center;
        color: rgb(194, 194, 194);
        &.selected {
          background: #f1f1f1;
          color: #f94040;
        }
      }
    }
    ::v-deep .loading {
      margin-top: -$HeaderHeight;
    }
    .books {
      overflow-y: scroll;
      overflow-x: hidden;
      height: calc( 100vh - #{$tabBarHeight} );
      width: 80vw;
      margin-top: -$HeaderHeight;
      ::v-deep .book-view {
        .info {
          width: calc(74vw - 10vh)
        }
      }
    }
  }
}
</style>
