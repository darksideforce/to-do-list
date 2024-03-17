<template>
  <div :class="computedClass">
    <div class="add-page-content">
      <p class="add-page-title">新增事务</p>
      <inputchoosen inputName="请输入事务名称" v-model:inputValue="projectObject.title" :rules="rulesMap.title" ref="title">
      </inputchoosen>
      <typechoosen v-model:type="projectObject.missionType" :rules="rulesMap.type" ref="type"></typechoosen>
      <datechoosen v-model:time="projectObject.time" :rules="rulesMap.date" ref="date"> </datechoosen>
      <inputchoosen inputName="请输入对接人" v-model:inputValue="projectObject.relate" :rules="rulesMap.relate" ref="relate">
      </inputchoosen>
      <inputchoosen inputName="请输入关联链接" v-model:inputValue="projectObject.link" :rules="rulesMap.link" ref="link">
      </inputchoosen>
      <inputchoosen inputName="请输入详细细节" input-type="multiple" v-model:inputValue="projectObject.descripiton"
        ref="descripiton" :rules="rulesMap.descripiton">
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

import { ipcRenderer } from 'electron'


import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { missTypeObject } from '../../type/missionType';
import { rulesMap } from '../../type/missionType/config'

/**
* 数据部分
*/
const props = defineProps({
  showAddPage: {
    type: Boolean,
    default: false
  }
})
let projectObject: missTypeObject = reactive({
  time: '',
  descripiton: '',
  content: '',
  title: '',
  missionType: '',
  star: 0,
  link: '',
  relate: ''
})
let title: any = ref(null)
let type: any = ref(null)
let date: any = ref(null)
let relate: any = ref(null)
let link: any = ref(null)
let descripiton: any = ref(null)

let computedClass = computed(() => { 
  return props.showAddPage?'add-page-root show-box':'add-page-root dispear-box'
})
onBeforeMount(() => {
})
onMounted(() => {
})
watchEffect(() => {
})
/**
 * 校验当前添加任务配置项，交由进程部分来进行存储任务
 */
const handleclickSubmit = () => {
  Promise.all([
    title.value.checkValidate(),
    relate.value.checkValidate(),
    date.value.checkValidate(),
    link.value.checkValidate(),
    type.value.checkValidate(),
    descripiton.value.checkValidate()
  ]).then(e => {
    console.log(e.indexOf(false))
    if (e.indexOf(false) > -1) {
      console.log('校验失败')
    }
    else {
      console.log('校验成功')
      ipcRenderer.invoke('success-create-file',JSON.stringify(projectObject))
    }
  })



}

</script>
<style scoped lang='less'>
.add-page-root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;

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
.show-box{
  top: 0;
  left: 0;
  animation: show-animation 0.3s linear 0s forwards;
  display: show;
}
.dispear-box{
  top: 0;
  left: 0;
  // display: none;
  animation: none-animation 0.3s linear 0s forwards;
  
}
.sumbitButton-text {
  margin-left: 20px;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  user-select: none;
}

@keyframes show-animation {
  0% {
    left: 100%;
    
  }

  100% {
    left: 0%;
  }
}
@keyframes none-animation {
  0%{
    left: 0%;
  }
  100%{
    left: 130%;
    display: none;
  }
}
</style>