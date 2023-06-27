<script setup lang="ts">
import Fullscreen from './Fullscreen.vue';
import { reactive } from 'vue';
const state = reactive({
  isFullScreen:false
})
const test = ()=>{
  console.log('点击了')
  state.isFullScreen = !state.isFullScreen;
  console.log(state.isFullScreen)
}
// function puahMsg(e){
//   // console.log(e)
// }
</script>

<template>
   <Fullscreen v-model="state.isFullScreen" :teleport="false">
        <!-- <div class="box" ></div> -->
        <img src="./assets/3.jpg" style="width: 400px;height: 200px;" @click="test">
   </Fullscreen>
   <!-- <button @click="test">点击全屏</button> -->
</template>

<style scoped>
/* .box{
  background-color: pink;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  font-size: 50px;
  text-align: center;
} */
</style>
