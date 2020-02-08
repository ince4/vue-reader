<template>
  <div class="book-swiper">
    <!-- 标题 -->
    <h2>
      <slot name="icon"/>
      <p><slot name="title"/></p>
    </h2>
    <!-- 推荐栏 -->
    <div class="swiper">
      <!-- 轮播图 -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) of booksData.slice(0,12)" :index="index" :key="index">
            <div class="swiper-item">
              <router-link :to="{ path: `book/${booksData[index]._id}`}">
                <img :src="HOST+booksData[index].cover" alt="封面图片" :οnerrοr="errorImg">
                <h3>{{booksData[index].title}}</h3>
              </router-link>
            </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    booksData: Array
  },
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      errorImg: "this.src = '../../assets/images/ku.png'",
      swiperOption: {
        // slidesPerView: 'auto',
        slidesPerView: 4,
        freeMode: true
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
.book-swiper {
  margin-bottom: 2vh;
  h2 {
    height: 6vh;
    margin-left: 2vw;
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
    touch-action: pan-y;
    width: 95vw;
    margin: 0 auto;
    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          width: auto;
          transition: 300ms;
          .swiper-item {
            width: 12vh;
            img {
            width: 12vh;
            height: 16vh;
            object-fit: cover;
            transform: scale(0.85)
          }
          h3 {
            color: #353333;
            font-size: 1.8vh;
            text-align: center;
            text-overflow:ellipsis;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 2.2vh;
          }
          }
        }
      }
    }
  }
}
</style>
