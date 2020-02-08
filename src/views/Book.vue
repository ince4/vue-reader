<template>
  <div class="book">
    <!-- header -->
    <m-header :title="bookData.title">
      <template v-slot:left>
          <span class="iconfont icon-fanhui" @touchend="$router.go(-1)"/>
      </template>
    </m-header>
    <loading v-if="!isLoaded"/>
    <div class="wrapper" v-else>
      <!-- 书记基本信息 -->
      <div class="basic-info">
        <!-- 封面 -->
        <img class="cover" :src="HOST+bookData.cover"/>
        <!-- 相关数据信息 -->
        <div class="info">
          <h2 class="title">{{ bookData.title }}</h2>
          <h3 class="author">{{ bookData.author }} 著</h3>
          <p class="book-data">
            {{ (bookData.wordCount/10000).toFixed(1) }}万字 / {{bookData.isSerial ? '连载中' : '已完结'}}
            <br>人气{{ (bookData.latelyFollower/10000).toFixed(1) }}万 #{{bookData.majorCate}}#
          </p>
        </div>
        <!--  -->
        <div class="back" :style="{'backgroundImage':`url(${HOST}${bookData.cover})`}"></div>
      </div>
      <div class="buttons">
        <button id="store-up">加入书架</button>
        <button id="read">立即阅读</button>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import Bottom from '../components/Book/Bottom'
import api from '../api/api.js'
export default {
  name: 'book',
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      isLoaded: false,
      bookData: []
    }
  },
  components: {
    Loading,
    Bottom,
    'm-header': Header
  },
  created () {
    api.getBookById(this.$route.params.bookId)
      .then((res) => {
        this.bookData = res.data
        this.isLoaded = true
      })
  }
}
</script>
<style lang="scss" scoped>
.book {
  .basic-info {
    margin-top: 7vh;
    padding-top: 3vh;
    padding-left: 4vw;
    .cover {
      width: 14vh;
      height: 20vh;
      display: inline-block;
      border: #d4d4d4 solid 1px;
      box-shadow: 2px 2px 4px 0px #d4d4d4;
      // vertical-align: top;
      z-index:1;
      position: relative;
      object-fit: cover;
      transform: scale(.95)
    }
    .info {
      display: inline-block;
      position: relative;
      width: calc(92vw - 17vh);
      padding-top: 2vw;
      padding-left: 2vw;
      z-index: 2;
      top: -5.6vh;
      left: 2vw;
      color: #ebebeb;
      .title {
        color: #f0f0f0;
        font-size: 2.6vh;
        // font-family: '黑体'
        font-weight: bold;
        line-height: 4vh;
        letter-spacing: 1px;
      }
      .author {
        font-size: 1.8vh;
        padding-top: 1vh;
      }
      .book-data {
        text-overflow:ellipsis;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 1.8vh;
        margin-top: 1.6vh;
        line-height: 3vh;
      }
    }
    .back {
      height: 27vh;
      width: 100vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position-y: 10%;
      filter:blur(6px);
      z-index: 0;
      position: absolute;
      top: 6vh;
      left: 0;
      opacity: .6;
      background-color: #999999;
      background-blend-mode:multiply;
    }
  }
  .buttons {
    border: 1px solid transparent;
    outline: none;
    #store-up {

    }
    #read {

    }
  }
}
</style>
