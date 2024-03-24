import { ValidationRule } from "quasar"

//任务字典
type missionType = 'dev' | 'document' | 'IO' | 'meeting' | 'thirdparty' |''

//任务类型种类
type missionTypeName = '开发' | '文档' | 'IO' | '会议' | '第三方'

//类型图标
type typeSvgIcon = 'dev-background' | 'document-background' | 'io-background' | 'meeting-background' | 'thirdparty-background'



//任务种类，添加时使用
type typeitem = {
  typeName: missionTypeName,
  typeDesrciption: string,
  typeSvg: typeSvgIcon,
  type:missionType
}
//翻页界面卡片的必传参数
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
//添加的必传参数
interface missTypeObject {
  time: string,
  descripiton: string,
  content: string,
  title?: string,
  missionType?: missionType,
  star?: number,
  relate?: string,
  link?: string
}

interface selftRule {
  rule: any,
  tips: string,
}
//添加页面的参数校验
interface ValidationRuleMap {
  title: ValidationRule[],
  missionType: ValidationRule[],
  time: ValidationRule[],
  relate: ValidationRule[],
  link: ValidationRule[],
  descripiton: ValidationRule[],
  date: ValidationRule[],
  type: selftRule
}

export type {
  missionType,
  missionTypeName,
  typeSvgIcon,
  typeitem,
  cardBoxItem,
  missTypeObject,
  ValidationRuleMap,
  selftRule
}