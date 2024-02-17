<template>
  <div class="date-choosen-root">
    <div class="choosen-header">
      <span>请选择完成日期</span>
    </div>
    <q-input  v-model="time" mask="date" :rules="['date']" :dense="false">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="time">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <!-- <div class="data-choosen-value">
      <div class="data-value" @click="handClickOpenDate">{{ time }}</div>
    </div>
    <q-date v-model="time" v-if="dateDialogShow" class="calendar" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
/**
* 数据部分
*/
const emit = defineEmits(['update:time'])
const props = defineProps({
  time: {
    type: String,
    default: ''
  },

})
const time = ref('')
let dateDialogShow = ref(false)
const handClickOpenDate = () => {
  dateDialogShow.value = !dateDialogShow.value
}
watch(() => props.time, () => {
  time.value = props.time;
}, {
  immediate: true
})
watch(() => time.value, () => {
  emit('update:time', time.value)
}, {
  immediate: true
})

</script>
<style scoped lang='less'>
input {
  width: 180px;
  height: 30px;
  // border-radius: 8px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  font-size: 20px;
}

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

.calendar {
  position: absolute;
  top: 80px;
  z-index: 10;
}
</style>