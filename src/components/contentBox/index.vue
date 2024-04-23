<template>
  <div class="contentBox-root">
    <BoxList @card-click="cardClick"  @up-date-data="updateData"></BoxList>
    <detailBox v-if="showDetailBox" @detail-click="detailClick" :mission-detail="missionDetail"></detailBox>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '@/store';
import BoxList from './boxList/index.vue'
import detailBox from './detailBox/index.vue'
import { cardBoxItem } from '@/type';
import { missTypeObject } from '@/type';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed, Ref } from 'vue';
/**
* 数据部分
*/
const store = mainStore()
let missionDetail: cardBoxItem | any = reactive({})

let showDetailBox = ref(false)
onBeforeMount(async () => {
  store.getFileList()
})
//点击卡片进行显示细节
const cardClick = (e: cardBoxItem) => {
  if (e) {
    showDetailBox.value = true
    missionDetail = e
  }
  else {
    console.log('细节不足，不允许跳转细节')
  }
}
//点击细节卡片进行关闭
const detailClick = () => {
  setTimeout(() => {
    showDetailBox.value = false
  }, 300)
}
const updateData = async () => {
  store.updateFileList()
}
</script>
<style scoped lang='less'>
.contentBox-root {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>