<template>
  <div class="main-page-root">
    <div class="title">
      <MainTitle :titleMessage="'To-Do-List'" @titleClick="handleclickAddTag"></mainTitle>
    </div>
    <div class="content">
      <contentBox></contentBox>
      <addpage v-if="showAddPage" class="add-pages"></addpage>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import MainTitle from '../../components/mainTitle/index.vue'
import contentBox from '../../components/contentBox/index.vue'
import addpage from '../../components/addpage/index.vue'


import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
const showAddPage = ref(false)
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})
const handleclickAddTag = (e:boolean)=>{
  console.log(`收到回调=${e}`)
  showAddPage.value = e
}
</script>
<style scoped lang='less'>
.main-page-root {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 10px;
  // padding-left: 40px;
  // padding-right: 40px;
}

.title {
  width: 100%;
  height: 50px;
  position: fixed;
}
.content{
  margin-top: 140px;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}
.add-pages{
  position: absolute;
  top: 0;
  left: 0;
}
</style>