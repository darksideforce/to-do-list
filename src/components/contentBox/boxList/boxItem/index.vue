<template>
  <div :class="computedClass"  
    @click="handleClickCardToDetail">
    <div class="header">
      <div class="title">{{ cardDetail.title }}</div>
      <div class="date">
        {{ cardDetail.time }}
      </div>
    </div>
    <div class="content">
      <div class="description">
        <SvgIcon :name="cardDetail.missionType + '-background'" color="primary" :width="180" :height="180"></SvgIcon>
      </div>
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
  cardClick: []
}>()
const { cardDetail, index } = reactive({ props }).props


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

const handleClickCardToDetail = () => {
  emit('cardClick')
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


.header {
  align-items: center;
  text-align: center;

  .title {
    font-weight: bold;
    font-size: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 30px;
  }
  .date{
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>