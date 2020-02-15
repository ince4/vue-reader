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
      <!-- 书籍基本信息 -->
      <div class="basic-info">
          <!-- 封面 -->
          <img class="cover" :src="HOST+bookData.cover"/>
          <!-- 书籍状态 -->
          <div class="info">
            <h2 class="title">{{ bookData.title }}</h2>
            <h3 class="author">{{ bookData.author }} 著</h3>
            <p class="book-status">
              {{ (bookData.wordCount/10000).toFixed(1) }}万字 / {{bookData.isSerial ? '连载中' : '已完结'}}
              <br>人气{{ (bookData.latelyFollower/10000).toFixed(1) }}万 #{{bookData.majorCate}}#
            </p>
          </div>
          <!-- blur -->
          <div class="back" :style="{'backgroundImage':`url(${HOST}${bookData.cover})`}"></div>
      </div>
      <!-- 书籍数据 -->
      <div class="data-bar">
        <div class="book-data">
          <span class="data-value">
            {{ (bookData.rating.score/1).toFixed(1) }}
            <span class="unit">分</span>
          </span>
          <h3 class="data-item">评分</h3>
        </div>
        <div class="book-data">
          <span class="data-value">
            {{ bookData.chaptersCount }}
          <span class="unit">章</span>
          </span>
          <h3 class="data-item">章节数</h3>
        </div>
        <div class="book-data">
          <span class="data-value">
            {{ (bookData.totalFollower/10000).toFixed(1) }}
            <span class="unit">万</span>
          </span>
          <h3 class="data-item">总点击</h3>
        </div>
      </div>
      <!-- 简介 -->
      <div class="intro">
        <p :class="{'longIntro': longIntro}">
          {{bookData.longIntro}}
        </p>
        <span class="iconfont icon-ICon-"
        :class="{'longIntro': longIntro}"
        @click="lineClampToggle"/>
      </div>
      <!-- 目录 -->
      <div class="catalogue">
        <span class="cat">目录</span>
        <span class="last-chapter">{{bookData.updated}} / {{bookData.lastChapter}}</span>
        <span class="iconfont icon-ICon-"/>
      </div>
      <!-- 底部 fixed -->
      <bottom :bookData="bookData"/>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import Bottom from '../components/Book/Bottom'
import { getUpdateMsg } from '../js/dateFtt.js'
import api from '../api/api.js'
export default {
  name: 'book',
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      isLoaded: false,
      bookData: [],
      longIntro: false
    }
  },
  components: {
    Loading,
    Bottom,
    'm-header': Header
  },
  methods: {
    lineClampToggle: function () {
      this.longIntro = !this.longIntro
    }
  },
  created () {
    api.getBookById(this.$route.params.bookId)
      .then((res) => {
        this.bookData = res.data
        this.isLoaded = true
        this.bookData.updated = getUpdateMsg(this.bookData.updated)
      })
  }
}
</script>
<style lang="scss" scoped>
.book {
  @include wrap-scroll;
  background: #f8f8f8;
  height: calc( 92vh - #{$HeaderHeight} );
  .basic-info {
    padding-top: 2vh;
    padding-left: 4vw;
    position: relative;
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
      .book-status {
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
      height: 24.4vh;
      width: 100vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position-y: 10%;
      filter:blur(2px);
      // transform: scale(1.1);
      z-index: 0;
      position: absolute;
      top: 0vh;
      left: 0;
      opacity: .6;
      background-color: #000000b0;
      background-blend-mode:multiply;
      border: 0;
    }
  }
  .data-bar {
    padding-top: 2vh;
    // border-bottom: 1px solid #ebebeb;
    height: 10vh;
    width: 100vw;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .book-data {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 30vw;
      .data-item {
        color: #808080;
        font-size: 1.8vh;
        padding-top: .8vh;
      }
      .data-value {
        font-size: 2.4vh;
        font-weight: bold;
        .unit {
          font-weight: normal;
          font-size: 2vh;
          margin-left: -4px;
        }
      }
    }
  }
  .intro {
    padding: 3vh 5vw;
    border-bottom: 1px solid #ebebeb;
    position: relative;
    p {
      font-size: 2vh;
      line-height: 3vh;
      width: 86vw;
      color: #222;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      white-space: pre-line;
      &.longIntro {
      -webkit-line-clamp: 40;
      }
    }
    .iconfont {
      color: #999999;
      position: absolute;
      left: 91.5vw;
      bottom: 5%;
      &.longIntro {
        transform: rotate(180deg);
      }
    }
  }
  .catalogue {
    width: 100vw;
    display: flex;
    height: 8vh;
    align-items: center;
    line-height: 2.2vh;
    border-bottom: #ebebeb solid 1px;
    .cat {
      color: #333;
      font-size: 2.2vh;
      padding-left: 4vw;
    }
    .last-chapter {
      color: #999;
      font-size: 1.8vh;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-left: auto;
      margin-right: 2vw;
      width: 65vw;
      word-wrap: nowrap;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-align: right;
    }
    .iconfont {
      color: #999999;
      font-size: 2vh;
      margin-right: 4vw;
      transform: rotate(-90deg)
    }
  }
}
</style>
