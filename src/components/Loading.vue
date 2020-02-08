<template>
  <div class="loading">
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  mounted () {
    Indicator.open({
      text: '载入中...',
      spinnerType: 'snake'
    })
  },
  destroyed () {
    Indicator.close()
  }
}
</script>
<style lang="scss" scoped>
</style>
