<template>
  <div class="boxlist-root" @mousewheel="handleMouseEvent" ref="carouselRef">
    <BoxItem class="springbox" v-for="item, index in list" :cardDetail="item" :index="index"
      @cardClick="cardClick(item)" :style="computedStyle(item, index)" @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave(index)"></BoxItem>
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
import { time } from 'console';
/**
* 数据部分,接受从父组件传入的数据
*/
interface propsType {
  missionList: missTypeObject | any
}
const props = withDefaults(defineProps<propsType>(), {
  missionList: []
})
type CarouseInfo = {
  drift: number[];
  scale: number[];
  zIndex: number[],
  length: number,
};
let list: cardBoxItem[] = reactive([])
let carouseInfo = reactive<CarouseInfo>({
  drift: [],
  scale: [],
  zIndex: [],
  length: 0
})
const carouselRef = ref();
const emit = defineEmits<{
  cardClick: [missionItem: cardBoxItem],
}>()
watch(() => props.missionList, (newvalue, oldvalue) => {
  if (newvalue.length) {
    list = operationList(props.missionList)
  }
}, {
  deep: true
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
  const maxLength = 10
  let array: any = []
  let drift = 115
  let scale = 1
  for (let i in missionList as Array<missTypeObject>) {
    array[i] = missionList[i]
    array[i].drift = drift
    carouseInfo.drift[i] = drift
    array[i].scale = scale
    carouseInfo.scale[i] = scale
    array[i].timeDetail = operationTime(missionList[i].time)
    carouseInfo.zIndex[i] = parseInt(i) + 1
    drift -= 25
    scale -= 0.05
  }
  carouseInfo.drift = carouseInfo.drift.reverse()
  carouseInfo.scale = carouseInfo.scale.reverse()
  // carouseInfo.zIndex = carouseInfo.zInde
  carouseInfo.length = carouseInfo.drift.length
  return array.reverse()
}
const cardClick = (e: cardBoxItem) => {
  emit('cardClick', e)
}
//滚动动画
const animeOperation = (arrowType: string) => {
  const drift = arrayOperation(carouseInfo.drift, arrowType)
  const scale = arrayOperation(carouseInfo.scale, arrowType)
  const zIndex = arrayOperation(carouseInfo.zIndex, arrowType)
  const domList = Array.from(carouselRef.value.children)
  domList.forEach((item, index) => {
    //向下滚动
    if (zIndex[index] === 1 && arrowType === 'down') {
      console.log(`向下滚动的第一个`);
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
          duration: 200
        });
      }, 400);
    }
    else if (zIndex[index] === carouseInfo.length && arrowType === 'up') {
      (item as HTMLDivElement).style.zIndex = '0';
      anime({
        targets: item as HTMLDivElement,
        translateY: list[0].drift - 25,
        scale: list[0].scale - 0.05,
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
          duration: 200
        });
      }, 400);
    }
    else {
      (item as HTMLDivElement).style.zIndex = zIndex[index].toString()
      anime({
        targets: item as HTMLDivElement,
        translateY: drift[index],
        scale: scale[index],
        easing: 'linear',
        duration: 500
      });
    }
  });
}

const arrayOperation = (val: number[], type: string) => {
  const target = type === 'down' ? val.shift() : val.pop();
  type === 'down' ? val.push(target!) : val.unshift(target!);
  return val;
}
//鼠标滚动
const handleMouseEvent = throttle((e: any) => {
  if (e.deltaY > 0) {
    animeOperation('down')
  }
  else {
    console.log(`鼠标向上滚动`)
    animeOperation('up')
  }
},700)
//鼠标悬停
const handleMouseEnter = (index: number) => {
  console.log(`mouseenter`)
}
const handleMouseLeave = (index: number) => {
  console.log(`mouseLeave`)
}
//处理时间为将过时或者离结束还剩XX，或者以及过时

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