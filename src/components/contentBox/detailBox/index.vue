<template>
  <div :class="computedClass">
    <div class="card-detail-header">
      <SvgIcon name="arrow-left" color="primary" width="large" height="large" @click="handleClickCardToClose"></SvgIcon>
    </div>
    <div class="card-detail-photo">
      <SvgIcon :name="messionType" color="primary" :width="330" :height="250"></SvgIcon>
    </div>
    <div class="card-detail-infobox">
      <div class="card-detail-title">
        text-title
      </div>
      <div class="card-detail-star">
        <rate :rate-number="2"></rate>
      </div>
    </div>
    <div class="card-detail-textlist">
      <section class="textlist-title">
        <p>待办事务详情</p>
        <SvgIcon name="more" color="primary" width="large" height="large"></SvgIcon>
      </section>
      <section class="textlist-section">
        <div class="text-list-logobox">
          <SvgIcon name="link" color="primary" width="large" height="large"></SvgIcon>
        </div>
        <div class="card-detail-info">
          https://www.bilibili.com/video/BV12C4y1u7gL/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=27558042a4d66743b53fc6b46b7a256a
        </div>
      </section>
      <section class="textlist-section">
        <div class="text-list-logobox">
          <SvgIcon name="calendar" color="primary" width="large" height="large"></SvgIcon>
        </div>
        <div class="card-detail-info"> date</div>
      </section>
      <section class="textlist-section">
        <div class="text-list-logobox">
          <SvgIcon name="content" color="primary" width="large" height="large"></SvgIcon>
        </div>
        <div class="card-detail-info"> detail</div>
      </section>
      <section class="textlist-section">
        <div class="text-list-logobox">
          <SvgIcon name="customer" color="primary" width="large" height="large"></SvgIcon>
        </div>
        <div class="card-detail-info"> people</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import rate from '../../rate/index.vue'
/**
* 数据部分
*/
const emit = defineEmits<{
  detailClick: []
}>()
// const data = reactive({})
let showDetailBox = ref(true)
const messionType = ref('dev-background').value
const computedClass = computed(() => {
  return showDetailBox.value === true ? 'detail-box-root regular-box' : 'detail-box-root none-box'
})
onBeforeMount(() => {
})
onMounted(() => {
})
watchEffect(() => {
})
const handleClickCardToClose = () => {
  emit('detailClick')
  showDetailBox.value = false
}

</script>
<style scoped lang='less'>
.detail-box-root {
  box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
  background-color: white;
  position: absolute;
  z-index: 20;
  border-radius: 30px;
  box-sizing: border-box;
  overflow: hidden;

}

.regular-box {
  width: 330px;
  height: 750px;
  display: flex;
  flex-direction: column;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: move-in 0.3s linear 0s 1 normal forwards;
}

.none-box {
  top: 40px;
  animation: move-out 0.3s linear 0s 1 normal forwards;
}

@keyframes move-in {
  0% {
    width: 330px;
    height: 700px;
    left: 130%;
    transform: translateX(-50%);
  }

  100% {
    width: 330px;
    height: 700px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes move-out {
  0% {
    width: 330px;
    height: 700px;
    left: 50%;
    transform: translateX(-50%);
  }

  100% {
    width: 330px;
    right: 20px;
    height: 700px;
    left: 130%;
    transform: translateX(-50%);
  }
}

.card-detail-header {
  position: absolute;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  align-items: center;
  height: 60px;
  display: flex;
  // background-color: red;
  border-radius: 20px 20px 0px 0px;
}

.card-detail-photo {
  height: 250px;
  box-sizing: border-box;
  background-color: rgb(255, 186, 95);
  border-radius: 0px 0px 20px 20px;
}

.card-detail-infobox {
  position: absolute;
  width: 200px;
  height: 180px;
  box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4);
  left: 50%;
  transform: translateX(-50%);
  top: 180px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;

  .card-detail-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
  }
}

.card-detail-textlist {
  margin-top: 110px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  padding: 10px 40px 0px;
  flex-direction: column;
  overflow-y: scroll;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    display: none;
  }

  .textlist-title {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
  }

  .textlist-section {
    margin-top: 10px;
    height: max-content(170px);

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;

    // height: min-content;
    .card-detail-info {
      min-height: 80px;
      margin-left: 40px;
      display: inline-block;
      // height: 120px;
      // flex-wrap: wrap;
      overflow-wrap: break-word;
      width: 170px;
      // flex: 1;
      word-break: break-all;
      // overflow: auto;
    }

    .text-list-logobox {
      width: 40px;
      height: 40px;
      background-color: #eaf0ec;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 10px;
    }
  }
}
</style>