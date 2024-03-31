<template>
  <div class="boxlist-root">
    <BoxItem v-for="item, index in list" :cardDetail="item" :index="index" @cardClick="cardClick(item)"></BoxItem>
  </div>
</template>

<script setup lang="ts">
// import { cardBoxItem } from '../../../type/missionType/index'
import { cardBoxItem } from '@/type/index';
import { missTypeObject } from '@/type/missionAdd';
import BoxItem from './boxItem/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed } from 'vue';
/**
* 数据部分,接受从父组件传入的数据
*/
interface propsType {
  missionList: missTypeObject | any
}
const props = withDefaults(defineProps<propsType>(), {
  missionList: []
})

let list: missTypeObject[] = reactive([])

const emit = defineEmits<{
  cardClick: [missionItem: missTypeObject],
}>()

watch(() => props.missionList, (newvalue, oldvalue) => {
  if (newvalue.length) {
    list = operationList(props.missionList)
  }
}, {
  deep: true
})
//方法，将传入的数组处理成展示用的列表
const operationList = function (missionList: Array<missTypeObject | any>): missTypeObject[] {
  const maxLength = 10
  let array: any = []
  let drift = 115
  let scale = 1
  for (let i in missionList as Array<missTypeObject>) {
    array[i] = missionList[i]
    array[i].drift = drift
    array[i].scale = scale
    drift -= 15
    scale -= 0.03
  }
  return array.reverse()
}
const cardClick = (e: missTypeObject) => {
  emit('cardClick', e)
}

</script>
<style scoped lang='less'>
.boxlist-root {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
}
</style>