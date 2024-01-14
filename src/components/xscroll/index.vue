<template>
    <!-- v-size-ob 指令，可以在 dom 元素改变大小时获取 dom 元素的尺寸，并且返回尺寸 -->
    <div v-size-ob="handleChange" class="scroll-container">
      <div class="v-scroll">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  const s = reactive({ // 声明一个响应式数据存储一下
    w: 0,
    h: 0,
  });
  function handleChange(size:any) { // 通过 v-size-ob 指令的返回值获取 container 的大小
    s.w = size.width;
    s.h = size.height;
    console.log(s)
  }
  </script>
  
  <style scoped>
  /* 为每一个盒子加上边框方便查看效果 */
  .scroll-container {
    width: 100%;
    height: 100%;
  }
  .v-scroll {

    --w:calc(v-bind("s.w") * 1px);
    --h:calc(v-bind("s.h") * 1px);
    width: var(--h);
    /* scroll 高等于 container 的宽  */
    height: var(--w);
    overflow: auto;
    position: relative;
    transform-origin: left top;
    transform: translateY(var(--h))rotate(-90deg);
    &::-webkit-scrollbar {
    display: none;
  }
  }
  .content {
    height: var(--h);
    position: absolute;
    left: var(--h);
    /* border: 2px solid red; */
    transform-origin: left top;
    transform: rotate(90deg);
    &::-webkit-scrollbar {
    display: none;
  }
  }
  </style>
