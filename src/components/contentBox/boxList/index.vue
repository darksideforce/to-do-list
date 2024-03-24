<template>
  <div class="boxlist-root">
    <BoxItem v-for="item,index in list" :cardDetail="item" :index="index" @cardClick="cardClick"></BoxItem>
  </div>
</template>

<script setup lang="ts">
import { cardBoxItem } from '../../../type/missionType/index'
import BoxItem from './boxItem/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const list: cardBoxItem[] = reactive([
  {
    type: 'error',
    time: 100,
    descripiton: 'testContent',
    content: 'testContent',
    drift: 10,
    scale: 0.79,
    title:'test大标题',
    missionType:'dev',
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 25,
    scale: 0.82,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 40,
    scale: 0.85,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 55,
    scale: 0.88,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 70,
    scale: 0.91,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 85,
    scale: 0.94,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 100,
    scale: 0.97,
  },
  {
    type: 'error',
    time: 100,
    descripiton: 'test',
    content: 'test',
    drift: 115,
    scale: 1,
  },
])
const emit = defineEmits<{
  cardClick:[index:Number]
}>()
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
const cardClick = (e:Number)=>{
  console.log(`监听到点击事件`)
  console.log(`e=${JSON.stringify(e)}`)
  emit('cardClick',e)
}

</script>
<style scoped lang='less'>
.boxlist-root {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
}
</style>../../../type/missionAdd/index