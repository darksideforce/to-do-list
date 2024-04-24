<template>
  <div class="boxlist-root" @mousewheel="handleMouseEvent" ref="carouselRef">
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
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed, nextTick } from 'vue';
import anime from 'animejs';
import { storeToRefs } from "pinia";
import { mainStore } from "@/store"
import { animationConfig } from './controler';

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
const showBoxItem = ref(true)

const aniConfig = new animationConfig()
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
const { fileList, upDateFlag } = storeToRefs(store)
watch(() => fileList, (newvalue, oldvalue) => {
  //由于数组的变更动画等操作，index并不是视图所示的位置，所以需要查找出index并在指定位置进行删除
  showBoxItem.value = false
  if (newvalue.value.length && !upDateFlag.value) {
    console.log(`进行初始化逻辑`)
    //直接初始化
    let nowlist = operationList(fileList.value)
    aniConfig.generateList(fileList.value.length)
    for (let i in nowlist) {
      list[i] = nowlist[i]
    }
    list.length = nowlist.length
  }
  else if (newvalue.value.length && upDateFlag.value) {
    console.log(`进入置换逻辑`)
    arrayResonse(newvalue.value, list)
    store.clearUpdateFlag()
  }
  else if (newvalue.value.length === 0) {
    console.log(`进入判断`)
    list.length = 0
  }
  showBoxItem.value = true
}, {
  deep: true,
})
onMounted(() => {

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
  for (let i in missionList as Array<missTypeObject>) {
    array[i] = missionList[i]
    array[i].drift = drift
    carouseInfo.drift[i] = drift
    array[i].scale = scale
    carouseInfo.scale[i] = scale
    array[i].timeDetail = operationTime(parseInt(missionList[i].time)).days
    array[i].type = operationTime(parseInt(missionList[i].time)).delayType
    // carouseInfo.zIndex[i] = parseInt(i) + 1
    drift -= 25
    scale -= 0.05
  }
  
  return array.reverse()
}
const cardClick = (e: cardBoxItem) => {
  console.log(e)
  emit('cardClick', e)
}
//滚动动画
const animeOperation = async (arrowType: string) => {
  aniConfig.animationList(arrowType)
  const domList = Array.from(carouselRef.value.children)
  domList.forEach((item, index) => {
    //获取zindex等参数
    const zIndex = aniConfig.getConfig(index,'zIndex')
    const scale = aniConfig.getConfig(index,'scale')
    const drift = aniConfig.getConfig(index,'drift')
    console.log(`index=${index}`)
    console.log(zIndex)
    console.log(scale)
    console.log(drift)
    const len = aniConfig.len
    //向下滚动，且是第一个
    if (zIndex=== 1 && arrowType === 'down') {
      //处理第一个，需要先放大显示出好像小时然后隐藏
      (item as HTMLDivElement).style.zIndex = (len + 2).toString();
      anime({
        targets: item as HTMLDivElement,
        translateY: 140,
        scale: 1.05,
        easing: 'linear',
        opacity: 0,
        duration: 300
      });
      setTimeout(() => {
        (item as HTMLDivElement).style.zIndex = zIndex.toString();
        anime({
          targets: item as HTMLDivElement,
          translateY: drift,
          scale: scale,
          easing: 'linear',
          opacity: 1,
          duration: 500
        });
      }, 300);
    }
    //向上移动，且是最后一个
    else if (zIndex === len && arrowType === 'up') {
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
          (item as HTMLDivElement).style.zIndex = zIndex.toString();
          anime({
            targets: item as HTMLDivElement,
            opacity: 0.5,
            duration: 100
          })
          setTimeout(() => {
            anime({
              targets: item as HTMLDivElement,
              translateY: drift,
              scale: scale,
              easing: 'linear',
              opacity: 1,
              duration: 500
            });
          }, 100)
        }, 100);
      }, 200)
    }
    else {
      (item as HTMLDivElement).style.zIndex = zIndex.toString()
      anime({
        targets: item as HTMLDivElement,
        translateY: drift,
        scale: scale,
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
  // store.getFileList()
  emit('upDateData')
}
//鼠标滚动
const handleMouseEvent = throttle((e: any) => {
  if (!isMoving) {
    if (e.deltaY > 0 && list.length > 1) {
      animeOperation('down')
    }
    else if (list.length > 1) {
      animeOperation('up')
    }
  }
}, 1000)
//观察是减少还是增加
const arrayResonse = async(newvalue: Array<cardBoxItem | any>, oldvalue: cardBoxItem[]) => {
  //判断是数组减少了，在数组中找出删掉的数组进行裁剪
  if (newvalue.length < oldvalue.length) {

    const result = oldvalue.filter(item => {
      const includes = newvalue.find(items => {
        return items.id == item.id
      })
      return !includes
    })
    const index = oldvalue.findIndex(item => item.id === result[0].id)
    oldvalue.splice(index, 1)
    const resultList = operationList(oldvalue)
    aniConfig.rebuildList('reduce')
    await nextTick
    animeOperation('down')
  }
  //判断是数组增加了，在数组中找出当前的下标为1者在前方 进行递增
  else if (newvalue.length > oldvalue.length) {
    console.log(`进入了增加判断`)
    return 0
  }
  else {
    return 1
  }

}
const catchValue = (configList:number[]):number=>{
  if(list.length  < 7){
    
  }
  else{

  }
  return 0
}
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