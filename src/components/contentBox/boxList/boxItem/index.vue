<template>
  <div :class="computedClass" @click="handleClickCardToDetail">
    <div class="header">
      <div class="title">{{ cardDetail.title }}</div>
      <div class="smallContent">
        {{ cardDetail.time }}
      </div>
    </div>
    <div class="content">
      <div class="description">
        <SvgIcon :name="cardDetail.missionType + '-background'" color="primary" :width="230" :height="150"></SvgIcon>
        <div class="smallContent">
          {{ cardDetail.descripiton }}
        </div>
      </div>
    </div>
    <div class="button-area">
      <div class="button" @click.stop="handleclickToDone">
        <SvgIcon name="success" color="primary" :width="20" :height="20"></SvgIcon>
        <span>Done</span>
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
  console.log(cardDetail)
}
const handleclickToDone = ()=>{
  console.log(`done`)
}
</script>
<style scoped lang='less'>
.box-item-root {
  position: absolute;
  width: 250px;
  height: 540px;
  background-color: white;
  border-radius: 10px;
  margin-left: -110px;
  box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
  left: 50%;
  padding: @cardPadding @smallPadding;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
}


.header {
  align-items: center;
  text-align: center;
  .title {
    font-weight: bold;
    font-size: @textTitle;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 30px;
  }
}
.smallContent {
    font-size: @textSmaller;
    font-weight: 500;
    color: @shallow;
    padding: @smallPadding;
    text-align: center;

  }
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex:1;
  .description{
    width: 100%;
  }
}
.button-area{
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding:@cardPadding;
  margin-bottom: @contentPadding;
  .button{
    width: 115px;
    height: 50px;
    color: @dirtywhite;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @grey;
    text-align: center;
    span{
      margin-left: 10px;
    }
    // background-color: #000000;

  }
}
</style>