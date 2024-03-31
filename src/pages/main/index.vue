<template>
  <div class="main-page-root">
    <div class="title">
      <MainTitle :titleMessage="'To-Do-List'" @titleClick="handleclickAddTag"></mainTitle>
    </div>
    <div class="content">
      <contentBox></contentBox>
      <addpage v-if="showAddPage" :showAddPage="animationController"></addpage>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import MainTitle from '../../components/mainTitle/index.vue'
import contentBox from '../../components/contentBox/index.vue'
import addpage from '../../components/addpage/index.vue'
// import fs from 'node:fs'

import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
// import { ipcRenderer } from 'electron';
/**
* 数据部分
*/
const data = reactive({})
const showAddPage = ref(false)
const animationController = ref(false)
onBeforeMount(() => {
})

onMounted(async() => {
  //获取缓存的文件信息，并将其传入
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

//点击添加按钮
const handleclickAddTag = (e: boolean) => {
  animationController.value = e
  if (!e) {
    setTimeout(() => {
      showAddPage.value = e
    }, 300)
  }
  else {
    showAddPage.value = e
  }
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
}

.title {
  width: 100%;
  height: 50px;
  position: fixed;
}

.content {
  margin-top: 140px;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>