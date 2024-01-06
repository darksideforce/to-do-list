<template>
  <div class="box-item-root" :style="computedStyle" @mouseenter="mouseEnterCardItem" @mouseleave="mouseLeaveCardItem">
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { cardBoxItem } from '../../type'
/**
* 数据部分
*/
// const props = withDefaults(
//   defineProps<{ cardDetail: cardBoxItem }>(), {
//   cardDetail: () => {
//     return {
//       type: 'timing',
//       time: 1,
//       desrciption: '',
//       content: '',
//       drift: 10,
//       scale: 1,
//     }
//   }
// }
// )
const props = defineProps({
  cardDetail: {
    type: Object,
    default() {
      return {
        type: 'timing',
        time: 1,
        desrciption: '',
        content: '',
        drift: 10,
        scale: 1,
      }
    }
  },
  index:{
    type:Number,
    default:0,
  }
})

const { cardDetail } = reactive({ props }).props

const defaulDetail = JSON.parse(JSON.stringify(cardDetail))
let move = ref('0%')
const computedStyle = computed(() => {
  let styles: any = {}
  styles.top = cardDetail.drift + 'px'
  styles.width = 220 * cardDetail.scale + 'px'
  styles.height = 440 * cardDetail.scale + 'px'
  styles.marginLeft = - (220 * cardDetail.scale /2) + 'px'
  // styles.transform = `translateY(${move.value})`
  // styles.transform = `scaleX(${cardDetail.scale}) rotate(${rotate}deg)`//translateX(-50%)`
  return styles
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
const mouseEnterCardItem = (e: any) => {
  console.log(`mouse move = ${JSON.stringify(e)}`)
  // cardDetail.scale = cardDetail.scale * 1.2
  move.value = '-10%'
  // cardDetail.drift = cardDetail.drift + 20
  // rotate = 10
}
const mouseLeaveCardItem = (e: any) => {
  console.log(`mouse leave = ${JSON.stringify(e)}`)
  cardDetail.scale = defaulDetail.scale
  cardDetail.drift = defaulDetail.drift
  move.value = '0%'
}
// 使用toRefs解构
// let { } = { ...toRefs(data) } 


</script>
<style scoped lang='less'>
.box-item-root {
  position: absolute;
  width: 220px;
  height: 440px;
  background-color: white;
  border-radius: 10px;
  margin-left: -110px;
  box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
  left: 50%;
  animation:move-out 0.4s linear 0s 1 normal forwards;
}
.box-item-root:hover{
  animation:move-in 0.4s linear 0s 1 normal forwards;
  // animation-fill-mode: forwards;
  // animation-name: move-in;
  // animation-duration: 2s;
  // animation-fill-mode: forwards;
  // background-color: red;
}
@keyframes move-in{
  50%{
    transform: translateY(-5%);
  }
  100%{
    transform: translateY(-10%);
  }
}
@keyframes move-out{
  50%{
    transform: translateY(-5%);
  }
  100%{
    transform: translateY( 0%);
  }
}
</style>