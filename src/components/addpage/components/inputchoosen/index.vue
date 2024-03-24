<template>
  <div class="add-name-root">
    <span>{{ inputName }}</span>
    <q-input v-model="text" :dense="false" v-if="inputType === 'single'" :rules="rules" ref="inputRef" />
    <q-input v-if="inputType === 'multiple'" v-model="text" filled type="textarea" class="text-area" :rules="rules"
      ref="inputRef" />
  </div>
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, Ref, watch, PropType } from 'vue';
import { rulesMap } from '../../../../type/missionType/config'
/**
* 数据部分
*/
const emit = defineEmits(['update:inputValue'])
interface Props {
  inputName?: string,
  inputValue?: string,
  inputType?: string,
  rules?: ValidationRule[]
}
const props = withDefaults(defineProps<Props>(), {
  inputName: '',
  inputValue: '',
  inputType: 'single',
})

const inputRef: any = ref(null)
const text: Ref<string> = ref('')
watch(() => props.inputValue, () => {
  text.value = props.inputValue;
}, {
  immediate: true
})
watch(() => text.value, () => {
  console.log(`textvalue detached`)
  emit('update:inputValue', text.value)
}, {
  immediate: true
})

let checkValidate = async () => {
  return new Promise((resolve, reject) => {
    inputRef.value.validate()
    if (!inputRef.value.hasError) {
      resolve(true)
    }
    else {
      resolve(false)
    }
  })

  // }
}
let resetValidate = () => {
  console.log('清除校验')
}
defineExpose({
  checkValidate,
  resetValidate
})
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
</style>../../../../type/missionAdd/config