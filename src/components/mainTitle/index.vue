<template>
  <div class="main-title-root">
    <div class="left">
      <SvgIcon name="setting" color="primary" width="large" height="large"></SvgIcon>
    </div>
    <div class="middle">
      <p>{{ titleMessage }}</p>
    </div>
    <div class="right" @click="handleclickToAdd">
      <SvgIcon :name="isAddIng?'close':'add'" color="primary" width="large" height="large"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">

import { mainStore } from '@/store';
import { ref, onBeforeMount, onMounted } from 'vue';
const emit = defineEmits<{
  titleClick: [type:boolean]
}>()
defineProps<{ titleMessage: string }>()
const store = mainStore()
import { storeToRefs } from "pinia";

/**
* 数据部分
*/
// const type = ref(false)
const allowClick = ref(true)
const { isAddIng } = storeToRefs(store)
onBeforeMount(() => {

})
onMounted(() => {

})
const handleclickToAdd = ()=>{
  if(isAddIng.value){
    store.changeAddTag(false)
    emit('titleClick',isAddIng.value)
  }
  else{
    store.changeAddTag(true)
    emit('titleClick',isAddIng.value)
  }
  allowClick.value = false
  setTimeout(()=>{
    allowClick.value = true
  },300)
}

</script>
<style scoped lang='less'>
.main-title-root{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  .left{
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 5px;
    background-color: aliceblue;
  }
  .right{
    width: 40px;
    height: 40px;
  }
}
</style>