import { defineStore } from 'pinia'
import { missTypeObject } from '@/type';

export const mainStore = defineStore('main', {
  // 推荐用于完整类型推断的箭头函数
  state: () => {
    return {
      fileList: [] as missTypeObject | any
    }
  },
  actions: {
    //获取数据列表
    async getFileList(): Promise<boolean> {
      console.log(`data is updated now is getfilelist`)
      return new Promise(async (resovle, reject) => {
        const res = await (window as any).electronAPI.readFile()
        //如果获取到缓存文件，则进行展示
        if (res) {
          this.fileList = res
          resovle(true)
        }
        reject(false)
      })
    }
  }
})