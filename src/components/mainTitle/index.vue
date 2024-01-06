<template>
  <div class="main-title-root">
    <div class="left">
      <SvgIcon name="setting" color="primary" size="large"></SvgIcon>
    </div>
    <div class="middle">
      <p>{{ titleMessage }}</p>
    </div>
    <div class="right">
      <SvgIcon name="avatar" color="primary" size="large"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ titleMessage: string }>()
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {

})
onMounted(() => {

})
watchEffect(() => {
})
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.main-title-root{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  .left{
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 5px;
    background-color: aliceblue;
  }
  .right{
    width: 40px;
    height: 40px;
  }
}
</style>