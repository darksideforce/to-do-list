<template>
  <div class="add-name-root">
    <span>输入事务名称</span>
    <input type="text" class="add-name-input"/>
  </div>
</template>

<script setup lang="ts">
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
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.add-name-root{
    width:100%;
    display:flex;
    align-items:flex-start;
    flex-direction:column;
    margin-bottom: 20px;
    span{
        font-weight:regular;
        font-size:16px;
        color:rgba(0,0,0,0.9);
        margin-bottom:10px;
    }
    input{
      height: 30px;
      // border-radius: 8px;
      border-top: 0px ;
      border-left: 0px;
      border-right: 0px;
      outline: none;
    }
}
</style>