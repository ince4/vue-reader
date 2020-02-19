<template>
  <div class="discovery">
    <loading v-if="!isLoaded"/>
    <div v-else>
    <!-- header -->
    <m-header>
       <template v-slot:left>
          发现
        </template>
        <template v-slot:right>
          <span class="iconfont icon-sousuo1"/>
        </template>
    </m-header>
    <!-- 分区 -->
    <section class="class" v-for="(item, index) of cats" :key="index">
      <h1>{{ item.name }}</h1>
      <div class="cats-grid">
        <router-link
        :to="{name:'booklist', query:{gender: item.class, major: cat.name}}"
        v-for='(cat, index) in item.data'
        :key="index">
          <p class="name">{{cat.name}}</p>
          <p class="amount">{{cat.bookCount}}</p>
        </router-link>
      </div>
    </section>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import api from '../api/api.js'
export default {
  name: 'discovery',
  data () {
    return {
      isLoaded: false,
      cats: [
        {
          class: 'male',
          name: '男生',
          data: []
        },
        {
          class: 'female',
          name: '女生',
          data: []
        },
        {
          class: 'press',
          name: '出版',
          data: []
        }
      ]
    }
  },
  created () {
    api.getBookCats()
      .then(res => {
        for (let value of this.cats) {
          value.data = res.data[value.class]
        }
        this.isLoaded = true
      })
  },
  components: {
    'm-header': Header,
    Loading
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.discovery {
  // margin-top: 7vh;
  @include wrap-scroll;
  .class {
    h1 {
      color: #f94040;
      font-weight: bold;
      font-size: 2.4vh;
      padding: 3vh 1.6vh;
    }
    .cats-grid {
      display: grid;
      grid-template-columns: 33.3vw 33.3vw 33.3vw;
      a {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 10vh;
        .name {
          color: #333;
          font-weight: 700;
          font-size: 2vh;
        }
        .amount {
          padding-top: 1vh;
          color: #ccc;
          font-size: 1.8vh;
        }
      }
    }
    // height: 100px;
  }
}
</style>
