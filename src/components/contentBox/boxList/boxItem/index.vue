<template>
  <div :class="computedClass" @click="handleClickCardToDetail">
    <div class="header">
      <div class="title">{{ cardDetail.title }}</div>
      <div class="smallContent">
        {{ cardDetail.time }}
      </div>
      <div class="smallContent">
        {{ cardDetail.timeDetail }}
      </div>
    </div>
    <div class="content">
      <div class="description">
        <SvgIcon :name="cardDetail.missionType + '-background'" color="primary" :width="230" :height="150" class="svg">
        </SvgIcon>
        <div class="smallContent">
          {{ cardDetail.descripiton }}
        </div>

      </div>
    </div>
    <div class="button-area">
      <div class="button" v-longpress:click.stop="handleclickToDone, 1">
        <SvgIcon name="success" color="primary" :width="20" :height="20"></SvgIcon>
        <div class="text">Done</div>
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
  cardClick: [],
  cardFinish:[]
}>()
const { cardDetail, index } = reactive({ props }).props


//动态类名，根据是否鼠标悬浮来改变
const computedClass = computed(() => {
  return index === 7 ? 'box-item-root' : 'box-item-root springBox'
})
onBeforeMount(() => {
})
watchEffect(() => {
})

const handleClickCardToDetail = () => {
  emit('cardClick')
}
const handleclickToDone = async () => {
  try {
    const res = await (window as any).electronAPI.finishFile(JSON.stringify(cardDetail))
    console.log(cardDetail)
    console.log(`done`)
    emit('cardFinish')
  }
  catch (e: any) {
    console.log(`finish mission fail ,fail = ${e.message}`)
  }
}

</script>
<style scoped lang='less'>
.box-item-root {
  position: absolute;
  width: 250px;
  height: 540px;
  background-color: #f7f9fb;
  border-radius: 10px;
  margin-left: -110px;
  box-shadow: 1px -2px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
  
  left: 50%;
  padding: @contentPadding @cardPadding;
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
  flex: 1;

  .description {
    width: 100%;
  }
}

.button-area {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: @cardPadding;
  margin-bottom: @contentPadding;

  .button {
    width: 50px;
    height: 50px;
    color: @dirtywhite;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #66ff66;
    text-align: center;
    cursor: pointer;
    transition-duration: .5s;
    position: relative;
    overflow: hidden;
    font-weight: bold;
    font-size: @textContent ;

    .text {
      z-index: 2;
      user-select: none;
      width: 0px;
      opacity: 0;
      transition-duration: .3s
    }
  }

  .button:hover {
    width: 120px;
    height: 50px;
    transition-duration: .3s
  }

  .button:hover .text {
    line-height: 50px;
    text-align: center;
    width: 70px;
    height: 50px;
    opacity: 1;
    transition-duration: .3s
  }

  .button::before,
  .button::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 140%;
    height: 140%;
    z-index: 0;
  }

  .button::before {
    content: "";
    background: @grey;
    width: 150%;
    left: -30%;
    border-radius: 0%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  .button:active::before {
    transform: translate3d(100%, 0, 0);
    transition: all 1.5s;
  }

  :deep(.svg-icon-wrapper) {
    z-index: 2;
  }

  .button:active {
    // background: green;
    color: black;
    transform: scale(0.95);
    transition: all 1.5s;
  }

}
</style>