<template>
  <div class="add-page-root">
    <div class="add-page-content">
      <p class="add-page-title">新增事务</p>
      <namechoosen></namechoosen>
      <typechoosen></typechoosen>
    </div>
  </div>
</template>

<script setup lang="ts">
import typechoosen from './components/typechoosen/index.vue'
import namechoosen from './components/namechoosen/index.vue'




import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})


</script>
<style scoped lang='less'>
.add-page-root{
    
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    // align-items: center;
    .add-page-content{
      width: 400px;
      height: 750px;
      border-radius: 30px;
      box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
      background-color: white;
      box-sizing: border-box;
      padding: 10px 40px;
      .add-page-title{
        font-size: 30px;
        font-weight: bold;
      }
    }
}
</style>