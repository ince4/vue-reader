<template>
  <div class="rec-bar">
    <!-- 标题 -->
    <h2>
      <slot name="icon"/>
      <p><slot name="title"/></p>
    </h2>
    <!-- 推荐栏 -->
    <div class="swiper">
      <!-- 轮播图 -->
      <swiper :options="swiperOption" v-if="booksData.length === SLIDER_LENGTH">
        <swiper-slide :style="'width=22vw'" v-for="(item, index) of booksData" :index="index" :key="index">
            <img :src="HOST+booksData[index].cover" alt="封面图片" :οnerrοr="errorImg">
        </swiper-slide>
      </swiper>
      <div class="bref">
        <h3>{{brefTitle}}</h3>
        <p>{{brefIntroduction}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api/api.js'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    booksData: Array
  },
  data () {
    const that = this
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      SLIDER_LENGTH: 7,
      INITIAL_SLIDE: 3,
      // 被展示的推荐书籍信息
      brefTitle: '',
      brefIntroduction: '',
      errorImg: "this.src = '../../assets/images/ku.png'",
      // vue-awesome-swiper参数
      swiperOption: {
        slidesPerView: 3,
        initialSlide: 3,
        spaceBetween: 30,
        centeredSlides: true,
        on: {
          // slide切换时根据activeIndex值改变bref
          slideChangeTransitionEnd: function () {
            const books = JSON.parse(JSON.stringify(that.booksData))
            if (books[this.activeIndex]) {
              that.brefTitle = books[this.activeIndex].title
              that.brefIntroduction = books[this.activeIndex].longIntro
            }
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
.rec-bar {
  h2 {
    height: 6vh;
    margin: 3vh auto 0 2vw;
    span {
    font-size: 4vh;
    color: #f94040;
    }
    p {
      font-size: 2.4vh;
      font-family: 'Microsoft Yahei';
      letter-spacing: 0.1vw;
      display: inline-block;
      color: #f94040;
      font-weight: bold;
    }
  }
  // 轮播
  .swiper {
    .swiper-container {
      z-index: 0;
      .swiper-wrapper {
        margin-left: -33vw;
        .swiper-slide {
          transition: 300ms;
          transform: scale(0.7);
          img {
            width:26vw;
          }
        &.swiper-slide-active, .swiper-slide-duplicate-active{
          transform: scale(1);
          }
        }
      }
    }
  .bref {
    padding-top: 3vh;
    //书名
    h3 {
      font-size: 2.2vh;
      font-family: '微软雅黑';
      color: #f06262;
      padding-left: 3vw;
    }
    //简介
    p {
      color: #adadad;
      font-size: 1.8vh;
      padding-top: 2vh;
      margin: 0 auto;
      width: 92vw;
      text-overflow:ellipsis;
      // white-space: nowrap;
      display: -webkit-box;
      line-height: 2.8vh;
      letter-spacing: .3px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  }
}
</style>
