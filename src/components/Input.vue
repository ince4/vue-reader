<template>
  <div>
     <!-- 输入框 -->
    <div class="input" :class="{'is-invalid':errorMessage}">
          <input
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name="name"
          @input="$emit('input',$event.target.value)">
      <!--  -->
          <button v-if="btnText" :disabled="btnDisabled" @click="$emit('btnClick')">{{btnText}}</button>
    </div>
    <!-- 错误信息 -->
          <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>
<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String,
    name: String,
    btnText: String,
    btnDisabled: Boolean,
    errorMessage: String
  },
  methods: {
    fuck () {
      alert('asd')
    }
  }
}
</script>>
<style lang="scss" scoped>
.input {
  border: 1px solid #ccc;
  border-radius: 2vw;
  padding: 3vw;
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    outline: none;
    border: none;
    font-size: 3.5vw;
  }
  button {
      border: none;
      outline: none;
      background: #fff;
      font-size: 3vw;
    &:disabled {
    color: #ccc;
    };
  }
}
.error-message{
    margin: 1vh auto 0 1vw;
    color: #ea7979;
}
.is-invalid {
  border: 1px solid rgb(207, 74, 74);
}
// .invalid-feedback {
//   color: red;
//   padding-top: 5px;
// }

</style>
