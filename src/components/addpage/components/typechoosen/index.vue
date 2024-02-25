<template>
  <div class="type-choosen-root">
    <div class="choosen-header">
      请选择类型
    </div>
    <div class="choosen-list">
      <xscroll class="xcroll">
        <div class="inner">
          <div :class="item.type === selectedValue ? 'type-choosen-item selected' : 'type-choosen-item unselected'"
            v-for="item in typeList" @click="handleclickTypeChoosen(item)">
            <SvgIcon :name="item.typeSvg" color="primary" :width="180" :height="180"></SvgIcon>
            <div class="text">
              <span class="type-title">{{ item.typeName }}</span>
              <span class="type-description">{{ item.typeDesrciption }}</span>
            </div>
          </div>
        </div>
      </xscroll>
      <div v-if="!selectedRoot" class="unselected-root">
        {{ rules.tips }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import xscroll from '../../../xscroll/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { typeitem, selftRule } from '../../../../type/missionType';
import { addTypeList } from '../../../../type/missionType/config'
/**
* 数据部分
*/
const emit = defineEmits(['update:type'])
interface Props {
  type: string,
  rules: selftRule
}
const props = withDefaults(defineProps<Props>(), {
  type: ''
})
const typeList: typeitem[] = reactive(addTypeList)
let selectedValue = ref('')
let selectedRoot = ref(true)
const handleclickTypeChoosen = (e: typeitem) => {
  checkValidate()
  if(selectedValue.value !== e.type){
    selectedValue.value = e.type
  }
  else{
    selectedValue.value = ''
  }
}

watch(() => props.type, () => {
  console.log(props.type)
  selectedValue.value = props.type;
  emit('update:type', selectedValue.value)
}, {
  immediate: true
})
watch(() => selectedValue.value, () => {
  emit('update:type', selectedValue.value)
}, {
  immediate: true
})
let checkValidate = async () => {
  console.log(selectedValue.value)
  return new Promise((resolve, reject) => {
    if (selectedValue.value === '') {
      console.log('enter')
      selectedRoot.value = false
      resolve(false)
    }
    else {
      selectedRoot.value = true
      resolve(true)
    }
  })
}
let resetValidate = () => {
  console.log('清除校验')
}
onBeforeMount(() => {
})
onMounted(() => {

})
watchEffect(() => {
})

defineExpose({
  checkValidate,
  resetValidate
})

</script>
<style scoped lang='less'>
.unselected-root {
  position: relative;
  width: 100%;
  color: #C10015;
  font-size: 12px;
  animation: showanimation 0.1s linear 0s 1;
}

@keyframes showanimation {
  0% {
    width: 50%;
  }

  100% {
    width: 100%;
  }
}

.unselected-root::after {
  position: absolute;
  content: ' ';
  top: -2px;
  left: 0px;
  width: 100%;
  height: 2.5px;
  background-color: #C10015;
  // border-bottom: 2px solid red;
}

.type-choosen-root {
  width: 100%;
  height: 354px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  position: relative;

  .choosen-header {
    font-weight: regular;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 10px;
  }

  .choosen-list {
    width: 300px;
    position: relative;
    // margin-bottom: 20px;
    height: 330px;


    &::-webkit-scrollbar {
      display: none;
    }

    .type-choosen-item {
      border-radius: 20px;
      box-shadow:
        rgba(0, 0, 0, 0.35) 0px 5px 10px;
      width: 180px;
      height: 300px;
      margin-right: 10px;
      flex-shrink: 0;
      box-sizing: border-box;

      .text {
        padding: 10px;
        box-sizing: border-box;
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        .type-title {
          font-weight: bold;
          font-size: 22px;
        }

        .type-description {
          margin-top: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.35);
        }
      }
    }

    .selected {
      position: relative;
    }

    .selected ::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      border: 2px solid green;
      top: 0;
      left: 0;
      border-radius: 20px;
      box-sizing: border-box;
    }
  }

  .inner {
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
  }
}
</style>