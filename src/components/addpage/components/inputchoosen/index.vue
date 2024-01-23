<template>
  <div class="add-name-root">
    <span>{{ inputName }}</span>
    <q-input v-model="text" :dense="false" v-if="inputType === 'single'"/>
    <q-input v-if="inputType === 'multiple'" v-model="text" filled type="textarea" class="text-area" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const props = defineProps({
  inputName: {
    type: String,
    default: ''
  },
  inputValue: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: 'single'
  }
})
const text = ref('')
</script>
<style scoped lang='less'>
.add-name-root {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 20px;

  span {
    font-weight: regular;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 10px;
  }

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

  .text-area {
    width: 100%
  }
}
</style>