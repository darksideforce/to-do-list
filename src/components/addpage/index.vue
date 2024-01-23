<template>
  <div class="add-page-root">
    <div class="add-page-content">
      <p class="add-page-title">新增事务</p>
      <inputchoosen inputName="请输入事务名称"></inputchoosen>
      <typechoosen ></typechoosen>
      <datechoosen ></datechoosen>
      <inputchoosen inputName="请输入对接人"></inputchoosen>
      <inputchoosen inputName="请输入关联链接"></inputchoosen>
      <inputchoosen inputName="请输入详细细节" input-type="multiple"></inputchoosen>
    </div>
  </div>
</template>

<script setup lang="ts">
import typechoosen from './components/typechoosen/index.vue'
import inputchoosen from './components/inputchoosen/index.vue'
import datechoosen from './components/datechoosen/index.vue'



import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
let projectObject = reactive({
  type:'',
  time:'',
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})


</script>
<style scoped lang='less'>
.add-page-root {

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  // align-items: center;
  .add-page-content {
    width: 400px;
    height: 750px;
    border-radius: 30px;
    box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
    background-color: white;
    box-sizing: border-box;
    overflow-y: scroll;
    // padding: 10px;
    padding: 10px 40px;

    &::-webkit-scrollbar {
      display: none;
    }

    .add-page-title {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>