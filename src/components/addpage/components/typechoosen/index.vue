<template>
  <div class="type-choosen-root">
    <div class="choosen-header">
      请选择类型
    </div>
    <div class="choosen-list">
      <xscroll class="xcroll">
        <div class="inner">
          <div :class="item.typeName === selectedValue ? 'type-choosen-item selected' : 'type-choosen-item unselected'"
            v-for="item in typeList" @click="handleclickTypeChoosen(item)">
            <SvgIcon :name="item.typeSvg" color="primary" :width="180" :height="180"></SvgIcon>
            <div class="text">
              <span class="type-title">{{ item.typeName }}</span>
              <span class="type-description">{{ item.typeDesrciption }}</span>
            </div>
          </div>
        </div>
      </xscroll>

    </div>
  </div>
</template>

<script setup lang="ts">
import xscroll from '../../../xscroll/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { typeitem } from '../../../../type/missionType';
import { addTypeList } from '../../../../type/missionType/config'
/**
* 数据部分
*/
const emit = defineEmits(['update:type'])
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
const typeList: typeitem[] = reactive(addTypeList)
const selectedValue = ref('未选中')

const handleclickTypeChoosen = (e: typeitem) => {
  selectedValue.value = e.typeName
}
watch(() => props.type, () => {
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
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  console.log(typeList)
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
})

</script>
<style scoped lang='less'>
.type-choosen-root {
  width: 100%;
  height: 354px;
  margin-bottom: 20px;

  .choosen-header {
    font-weight: regular;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 10px;
  }

  .choosen-list {
    width: 300px;
    position: relative;

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