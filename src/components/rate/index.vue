<template>
  <div class="rate-star-root">
    <SvgIcon v-for="item in list" 
        :name="svgName(item)" 
        color="warn" width="large" height="large" 
        @mouseenter="mouseEnterCardItem(item)" 
        @mouseleave="mouseLeaveCardItem"
        @click="handleClickRateDecide(item)"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
const data = reactive({})
const fillMap:Record<number,string> = {
    0:'rate-star-empty',
    1:'rate-star-info',
    2:'rate-star-success',
    3:'rate-star-complete',
    4:'rate-star-warning',
    5:'rate-star-danger  '
}
const list = [1,2,3,4,5]
const props = defineProps({
    isEdit:{
        type:Boolean,
        default:true
    },
    rateNumber:{
        type:Number,
        default:1,
    }
})
let {rateNumber,isEdit} = reactive({props}).props
let rateNumberEditable = ref(rateNumber)
const svgName = (number)=>{
    // console.log(`number=${number},rateNumber=${rateNumberEditable}`)
    if(number > rateNumberEditable.value){
        return fillMap[0]
    }
    return fillMap[rateNumberEditable.value] 
}
const mouseEnterCardItem = (e)=>{
    // console.log(rateNumberEditable)
    if(isEdit){
        rateNumberEditable.value = parseInt(e)
    }
}
const mouseLeaveCardItem = () =>{
    if(isEdit){
        rateNumberEditable.value = rateNumber
    }
}
const handleClickRateDecide = (e)=>{
    if(isEdit){
        rateNumber = e
    }
}
</script>
<style scoped lang='less'>
.rate-star-root{
    display:flex;
    justify-content:center;
    height:100%;
}
</style>

