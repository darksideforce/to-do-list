import { defineStore } from 'pinia'
import { missTypeObject } from '@/type';

export const mainStore = defineStore('main', {
  // 推荐用于完整类型推断的箭头函数
  state: () => {
    return {
      allFileList: [] as missTypeObject | any,
      fileList: [] as missTypeObject | any,
      //用于判断是否刚刷新了数据
      upDateFlag:false, 
      isAddIng: false
    }
  },
  actions: {
    //获取数据列表
    async getFileList(): Promise<boolean> {
      return new Promise(async (resovle, reject) => {
        const res = await (window as any).electronAPI.readFile()
        //如果获取到缓存文件，则进行展示
        if (res) {
          this.allFileList = res
          this.fileList = (res as Array<missTypeObject>).filter(e => {
            return e.completionStatus !== 'complete'
          })
          resovle(true)
        }
        reject(false)
      })
    },
    async updateFileList(): Promise<boolean> {
      this.upDateFlag = true
      console.log(`执行了update`)
      return new Promise(async (resovle, reject) => {
        const res = await this.getFileList()
        //如果获取到缓存文件，则进行展示
        if (res) {
          
          resovle(true)
        }
        reject(false)
      })
    },
    clearUpdateFlag(){
      this.upDateFlag = false
    },
    changeAddTag(value: boolean) {
      this.isAddIng = value
    }
  }
})