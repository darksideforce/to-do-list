<template>
  <div class="date-choosen-root">
    <div class="choosen-header">
      <span>请选择完成日期</span>
    </div>
    <div class="data-choosen-value">
      <div class="data-value" @click="handClickOpenDate">{{ date }}</div>
    </div>
    <q-date v-model="date" v-if="dateDialogShow" class="calendar" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const date = ref(new Date().toLocaleDateString())
let dateDialogShow = ref(false)
const handClickOpenDate = () => {
  // console.log('open')
  dateDialogShow.value = !dateDialogShow.value
}


</script>
<style scoped lang='less'>
.date-choosen-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  position: relative;
  align-items: flex-start;
}

.choosen-header {
  display: flex;
  align-items: flex-start;
  font-weight: regular;
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 10px;
}

.data-choosen-value {
  display: flex;
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  
  .data-value {
    width: 180px;
    font-size: 20px;
    height: 30px;
    border-bottom: 2px solid #767676;
    user-select: none;
  }
}
.calendar{
    position: absolute;
    top: 80px;
    opacity: 1;
  }
</style>