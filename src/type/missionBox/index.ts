import { missionType } from "../missionAdd";

// error即是错误，warning是即将超时，timeout是已经超时，timing是正在计时
//翻页界面卡片的必要参数
interface cardBoxItem {
    type: 'error' | 'warning' | 'timeout' | 'timing',//任务时间
    time: number,//时间
    descripiton: string,//描述
    content: string,//内容
    drift: number,//位移值
    scale: number,//缩放比例
    title?: string,//title
    missionType?: missionType,//类型
    star?: number,
  }

  export type {
    cardBoxItem
  }