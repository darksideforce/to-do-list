<template>
  <div class="contentBox-root">
    <BoxList @card-click="cardClick"></BoxList>
    <detailBox v-if="showDetailBox" @detail-click="detailClick"></detailBox>

  </div>
</template>

<script setup lang="ts">
import BoxList from './boxList/index.vue'
import detailBox from './detailBox/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
let showDetailBox = ref(false)
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
  
})
const cardClick = ()=>{
  showDetailBox.value = true
}
const detailClick= ()=>{
  // console.log(``)
  setTimeout(()=>{
    showDetailBox.value = false
  },300)
}
</script>
<style scoped lang='less'>
.contentBox-root{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

}
</style>