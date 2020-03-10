<template>
  <div class="loading">
    <div class="container">
      <mt-spinner type="snake"></mt-spinner>
      <p>载入中...</p>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0vh;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 100px;
    height: 100px;
    border-radius: 5%;
    background-color: rgb(75, 75, 75);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      margin-top: 15px;
      color: rgb(165, 165, 165);
    }
  }
}
</style>
