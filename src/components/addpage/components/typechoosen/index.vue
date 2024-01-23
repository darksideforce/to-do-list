<template>
  <div class="type-choosen-root">
    <div class="choosen-header">
      请选择类型
    </div>
    <div class="choosen-list">
      <xscroll class="xcroll">
        <div class="inner">
          <div :class="item.typeName === selectedIndex ? 'type-choosen-item selected' : 'type-choosen-item unselected'"
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
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { typeitem } from '../../../../type/missionType';
/**
* 数据部分
*/

const typeList: typeitem[] = reactive([
  { typeName: '开发', typeDesrciption: '开发，bug单，demo等事务', typeSvg: 'dev-background' },
  { typeName: '文档', typeDesrciption: '上架文档，更新文档', typeSvg: 'document-background' },
  { typeName: 'IO', typeDesrciption: '工作电子流，请加权限等处理', typeSvg: 'io-background' },
  { typeName: '会议', typeDesrciption: '设计串讲showcase等', typeSvg: 'meeting-background' },
  { typeName: '第三方', typeDesrciption: '第三方bug，或者问题验证', typeSvg: 'thirdparty-background' },
])
const selectedIndex = ref('未选中')

const handleclickTypeChoosen = (e: typeitem) => {
  selectedIndex.value = e.typeName
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
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