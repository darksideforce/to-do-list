<template>
  <div class="boxlist-root" @mousewheel="handleMouseEvent" ref="carouselRef" v-if="showBoxItem">
    <BoxItem class="springbox" v-for="(item, index) in list" :cardDetail="item" :index="index"
      @cardClick="cardClick(item)" @card-finish="updateData" :style="computedStyle(item, index)"></BoxItem>
  </div>
</template>

<script setup lang="ts">
import throttle from 'lodash/throttle'
import { cardBoxItem } from '@/type/index';
import { missTypeObject } from '@/type/missionAdd';
import BoxItem from './boxItem/index.vue';
import { operationTime } from '@/utils'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed } from 'vue';
import anime from 'animejs';
import { storeToRefs } from "pinia";
import { mainStore } from "@/store"

const store = mainStore();
/**
* 数据部分,接受从父组件传入的数据
*/


type CarouseInfo = {
  drift: number[];
  scale: number[];
  zIndex: number[],
  length: number,
};

let list: cardBoxItem[] = reactive([])
const showBoxItem= ref(true)
let carouseInfo = reactive<CarouseInfo>({
  drift: [],
  scale: [],
  zIndex: [],
  length: 0
})
let isMoving = false
const carouselRef = ref();
const emit = defineEmits<{
  cardClick: [missionItem: cardBoxItem],
  upDateData: []
}>()
const { fileList } = storeToRefs(store)
watch(() => fileList, (newvalue, oldvalue) => {
  showBoxItem.value  = false
  if (newvalue.value.length) {
    let nowList = operationList(fileList.value)
    list = list.splice(0,nowList.length - list.length)
    for(let i in nowList){
      list[i] = nowList[i]
    }
  }
  console.log(`watch is edit over`,list.length)
  showBoxItem.value = true
}, {
  deep: true,
})
onMounted(() => {
  // let nowList = operationList(fileList.value)
  //   for(let i in nowList){
  //     list.push(nowList[i])
  //   }

})
//拼接样式，缩小与放大化
const computedStyle = (item: cardBoxItem, index: number) => {
  let styles: any = {}
  styles.transform = `translateY(${item.drift}px)  scale(${item.scale})`
  styles.zIndex = index + 1
  return styles
}
//方法，将传入的数组处理成展示用的列表
const operationList = function (missionList: Array<missTypeObject | any>): cardBoxItem[] {
  let array: any = []
  let drift = 115
  let scale = 1
  let filterList = (missionList as Array<missTypeObject>).filter(e => {
    return e.completionStatus !== 'complete'
  })
  for (let i in filterList) {
    array[i] = filterList[i]
    array[i].drift = drift
    carouseInfo.drift[i] = drift
    array[i].scale = scale
    carouseInfo.scale[i] = scale
    array[i].timeDetail = operationTime(parseInt(filterList[i].time)).days
    array[i].type = operationTime(parseInt(filterList[i].time)).delayType
    carouseInfo.zIndex[i] = parseInt(i) + 1
    drift -= 25
    scale -= 0.05
  }
  carouseInfo.drift = carouseInfo.drift.reverse()
  carouseInfo.scale = carouseInfo.scale.reverse()
  carouseInfo.length = carouseInfo.drift.length
  return array.reverse()
}
const cardClick = (e: cardBoxItem) => {
  emit('cardClick', e)
}
//滚动动画
const animeOperation = async (arrowType: string) => {
  const drift = arrayOperation(carouseInfo.drift, arrowType)
  const scale = arrayOperation(carouseInfo.scale, arrowType)
  const zIndex = arrayOperation(carouseInfo.zIndex, arrowType)
  const domList = Array.from(carouselRef.value.children)
  console.log(domList)
  domList.forEach((item, index) => {
    //向下滚动，且是第一个
    if (zIndex[index] === 1 && arrowType === 'down') {
      //处理第一个，需要先放大显示出好像小时然后隐藏
      (item as HTMLDivElement).style.zIndex = (carouseInfo.length + 2).toString();
      anime({
        targets: item as HTMLDivElement,
        translateY: 140,
        scale: 1.05,
        easing: 'linear',
        opacity: 0,
        duration: 300
      });
      setTimeout(() => {
        (item as HTMLDivElement).style.zIndex = zIndex[index].toString();
        anime({
          targets: item as HTMLDivElement,
          translateY: drift[index],
          scale: scale[index],
          easing: 'linear',
          opacity: 1,
          duration: 500
        });
      }, 300);
    }
    //向上移动，且是最后一个
    else if (zIndex[index] === carouseInfo.length && arrowType === 'up') {
      (item as HTMLDivElement).style.zIndex = '0';
      anime({
        targets: item as HTMLDivElement,
        translateY: list[0].drift - 25,
        scale: list[0].scale - 0.05,
        easing: 'linear',
        opacity: 0,
        duration: 200
      });
      setTimeout(() => {
        anime({
          targets: item as HTMLDivElement,
          translateY: 140,
          scale: 1.05,
          easing: 'linear',
          opacity: 0,
          duration: 100
        })
        setTimeout(() => {
          (item as HTMLDivElement).style.zIndex = zIndex[index].toString();
          anime({
            targets: item as HTMLDivElement,
            opacity: 0.5,
            duration: 100
          })
          setTimeout(() => {
            anime({
              targets: item as HTMLDivElement,
              translateY: drift[index],
              scale: scale[index],
              easing: 'linear',
              opacity: 1,
              duration: 500
            });
          }, 100)
        }, 100);
      }, 200)
    }
    else {
      console.log(zIndex[index]);
      (item as HTMLDivElement).style.zIndex = zIndex[index].toString()
      anime({
        targets: item as HTMLDivElement,
        translateY: drift[index],
        scale: scale[index],
        easing: 'linear',
        duration: 400,
      });
    }
  });
}
const animeOperationDisapear = async () => {
}
//根据不同的方向筛选出后续的数组
const arrayOperation = (val: number[], type: string) => {
  const target = type === 'down' ? val.shift() : val.pop();
  type === 'down' ? val.push(target!) : val.unshift(target!);
  return val;
}
const updateData = async () => {
  store.getFileList()
  emit('upDateData')
}
//鼠标滚动
const handleMouseEvent = throttle((e: any) => {
  if (!isMoving) {
    if (e.deltaY > 0) {
      animeOperation('down')
    }
    else {
      animeOperation('up')
    }
  }
}, 1000)

//处理时间为将过时或者离结束还剩XX，或者以及过时
//通知父组件更新数据

</script>
<style scoped lang='less'>
.boxlist-root {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
}

.btn {
  width: 100px;
  height: 50px;
  background-color: red;
}
</style>