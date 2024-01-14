<template>
  <div class="type-choosen-root">
    <div class="choosen-header">
      请选择类型
    </div>
    <div class="choosen-list">
      <xscroll class="xcroll">
        <div class="inner">
          <div class="type-choosen-item">
          </div>
          <div class="type-choosen-item">
          </div>
          <div class="type-choosen-item">
          </div>
          <div class="type-choosen-item">
          </div>
        </div>
      </xscroll>

    </div>
  </div>
</template>

<script setup lang="ts">
import xscroll from '../../../xscroll/index.vue'
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
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.type-choosen-root {
  width: 100%;
  height: 330px;

  .choosen-list {
    width: 300px;
    position: relative;
    // box-sizing: border-box;
    height: 330px;
    // display: flex;
    // // align-items: center;
    // // justify-content: flex-start;
    // flex-wrap: nowrap;
    // overflow-x: scroll;
    // overflow-y: hidden;
    // flex-shrink: 0;
    // flex-basis: 180px;
    // white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }

    .type-choosen-item {
      border-radius: 20px;
      box-shadow:
        rgba(0, 0, 0, 0.35) 0px 5px 10px;
      width: 180px;
      height: 300px;
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .inner{
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
  }
}
</style>