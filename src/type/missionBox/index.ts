import { missionModel, missionType } from "../missionAdd";

// error即是错误，warning是即将超时，timeout是已经超时，timing是正在计时
//翻页界面卡片的必要参数
interface cardBoxItem extends missionModel{
  time: number,//时间
  id: string,
  drift: number,//位移值
  scale: number,//缩放比例
  timeDetail: string,
}

export type {
  cardBoxItem
}