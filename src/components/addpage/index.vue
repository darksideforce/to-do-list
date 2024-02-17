<template>
  <div class="add-page-root">
    <div class="add-page-content">
      <p class="add-page-title">新增事务</p>
      <inputchoosen inputName="请输入事务名称" v-model:inputValue="projectObject.title" :rules="rulesMap.title"></inputchoosen>
      <typechoosen v-model:type="projectObject.missionType"></typechoosen>
      <datechoosen v-model:time="projectObject.time"></datechoosen>
      <inputchoosen inputName="请输入对接人" v-model:inputValue="projectObject.relate" :rules="rulesMap.relate"></inputchoosen>
      <inputchoosen inputName="请输入关联链接" v-model:inputValue="projectObject.link" :rules="rulesMap.link"></inputchoosen>
      <inputchoosen inputName="请输入详细细节" input-type="multiple" v-model:inputValue="projectObject.descripiton" :rules="rulesMap.descripiton">
      </inputchoosen>
      <clickButton class="submitbutton" @submit-click="handleclickSubmit">
        <SvgIcon name="sumbit" color="warn" :width="100" :height="100">
        </SvgIcon>
        <div class="sumbitButton-text">
          提交
        </div>
      </clickButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import typechoosen from './components/typechoosen/index.vue'
import inputchoosen from './components/inputchoosen/index.vue'
import datechoosen from './components/datechoosen/index.vue'
import clickButton from '../clickButton/index.vue'


import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { missTypeObject } from '../../type/missionType';
import { rulesMap } from '../../type/missionType/config'
/**
* 数据部分
*/
let projectObject: missTypeObject = reactive({
  time: '',
  descripiton: '',
  content: '',
  title: '',
  missionType: 'dev',
  star: 0,
  link: '',
  relate: ''
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
const handleclickSubmit = () => {
  console.log(projectObject)
}

</script>
<style scoped lang='less'>
.add-page-root {

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  // align-items: center;
  .add-page-content {
    width: 400px;
    height: 750px;
    border-radius: 30px;
    box-shadow: 1px -1px 20px -5px rgba(50, 50, 73, 0.4), 0 1px 1px -1px rgba(50, 50, 73, 0.3);
    background-color: white;
    box-sizing: border-box;
    overflow-y: scroll;
    // padding: 10px;
    padding: 10px 40px;

    &::-webkit-scrollbar {
      display: none;
    }

    .add-page-title {
      font-size: 30px;
      font-weight: bold;
    }
  }

  .submitbutton {
    position: absolute;
    top: 800px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.sumbitButton-text {
  margin-left: 20px;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  user-select: none;
}
</style>