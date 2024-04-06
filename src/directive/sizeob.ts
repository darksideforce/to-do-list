const map = new WeakMap();
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      const box = entry.borderBoxSize[0];
      handler({
        width: box.inlineSize,
        height: box.blockSize,
      });
    }
  }
});


export const Resize:any = {
    mounted(el:any, binding:any) {
        //将dom与回调的关系塞入map
        map.set(el, binding.value)
        //监听el元素的变化
        ob.observe(el)
    },
    unmounted(el:any) {
        //取消监听
        ob.unobserve(el)
    }
}
