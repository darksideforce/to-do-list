<template>
  <div class="click-button-root">
    <div @click="handleClickSubmit" className="click-button-son" ref="clickButton">
      
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
const clickButton = ref<any>(null)
const emit = defineEmits<{
  submitClick: []
}>()

let buttonAnimation = ref(false)
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  // console.log(clickButton)
  // clickButton.addEventListener()
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})
//增加样式部分,点击增加气泡
const handleClickSubmit = (e:any) => {
  if (!buttonAnimation.value) {
    buttonAnimation.value = true
    let x = e.offsetX//e.x - e.target.offsetLeft
    let y = e.offsetY//e.y - e.target.offsetTop
    let ripples:any = document.createElement('span')
    ripples.className = "ripples"
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    clickButton.value.appendChild(ripples)
    setTimeout(() => {
      ripples.remove()
      buttonAnimation.value = false
    }, 500);
  }
  emit('submitClick')
  
}
</script>
<style  lang='less'>
.click-button-root {
  // background-color:red;
  width: 400px;
  height: 100px;
  border-radius: 30px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #729f65;
  position: relative;
  overflow: hidden;

  .click-button-son {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    z-index:10;
    top:0;
    left:0;
  }
}

.ripples {
  background-color: red;
  position: absolute;
  background: #fff;
  transform: translate(-50%; -50%);
  border-radius: 50%;
  animation: rippleAnimation 0.5s linear infinite;
  opacity: 0.2;
}

@keyframes rippleAnimation {
  0% {
    width: 0%;
    height: 0%;
  }

  100% {
    width: 800px;
    height: 800px;
  }
}
</style>