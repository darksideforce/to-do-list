<template>
  <div class="contentBox-root">
    <BoxList @card-click="cardClick" :missionList="missionList"></BoxList>
    <detailBox v-if="showDetailBox" @detail-click="detailClick" :mission-detail="missionDetail"></detailBox>
  </div>
</template>

<script setup lang="ts">
import BoxList from './boxList/index.vue'
import detailBox from './detailBox/index.vue'
import { cardBoxItem } from '@/type';
import { missTypeObject } from '@/type';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, Ref } from 'vue';
/**
* 数据部分
*/
let missionDetail: cardBoxItem | any = reactive({})
let showDetailBox = ref(false)
let missionList: Ref<Array<missTypeObject | any>> = ref([])
onBeforeMount(async () => {
  missionList.value = await resolveFile()
})
onMounted(() => {
})
watchEffect(() => {

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
//解析本地文件
const resolveFile = async function (): Promise<any[]> {
  const res = await (window as any).electronAPI.readFile()
  //如果获取到缓存文件，则进行展示
  if (res) {
    return res
  }
  return []
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