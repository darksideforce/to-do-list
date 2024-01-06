<template>
  <div class="contentBox-root">
    <BoxList></BoxList>
  </div>
</template>

<script setup lang="ts">
import BoxList from './boxList/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
  
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.contentBox-root{
  width: 100%;
  height: 100%;
}
</style>