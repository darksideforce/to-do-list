<template>
  <div :class="computedClass" :style="computedStyle" @mouseenter="mouseEnterCardItem" @mouseleave="mouseLeaveCardItem"
    @click="handleClickCardToDetail">
    <div class="header">
      <div class="title">{{ cardDetail.title }}</div>
    </div>
    <div class="content">
      <div class="description">
        <SvgIcon :name="cardDetail.missionType + '-background'" color="primary" :width="180" :height="180"></SvgIcon>
      </div>
    </div>
    <div class="date">
      {{ cardDetail.date }}
    </div>
    <!-- <div class="collect"></div> 预留区域，收藏或者重点事件-->
    <!-- <div class="collect"></div> 预留区域，取消关注事件-->

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { cardBoxItem } from '@/type/missionBox';
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
  index: {
    type: Number,
    default: 0,
  }
})
const emit = defineEmits<{
  cardClick: [index: Number]
}>()
const { cardDetail, index } = reactive({ props }).props
let move = ref('0%')
const computedStyle = computed(() => {
  let styles: any = {}
  styles.top = cardDetail.drift + 'px'
  styles.width = 220 * cardDetail.scale + 'px'
  styles.height = 440 * cardDetail.scale + 'px'
  styles.marginLeft = - (220 * cardDetail.scale / 2) + 'px'
  return styles
})
//动态类名，根据是否鼠标悬浮来改变
const computedClass = computed(() => {
  return index === 7 ? 'box-item-root' : 'box-item-root springBox'
})
onBeforeMount(() => {
})
onMounted(() => {
})
watchEffect(() => {
})
const mouseEnterCardItem = (e: any) => {
  move.value = '-10%'
}
const mouseLeaveCardItem = (e: any) => {
  move.value = '0%'
}
const handleClickCardToDetail = () => {
  emit('cardClick', index)
}
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
  padding: 15px 10px;
}

.springBox {
  animation: move-out 0.4s linear 0s 1 normal forwards;
}

.springBox:hover {
  animation: move-in 0.4s linear 0s 1 normal forwards;
}

@keyframes move-in {
  50% {
    transform: translateY(-5%);
  }

  100% {
    transform: translateY(-10%);
  }
}

@keyframes move-out {
  50% {
    transform: translateY(-5%);
  }

  100% {
    transform: translateY(0%);
  }
}

.header {
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 30px;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>