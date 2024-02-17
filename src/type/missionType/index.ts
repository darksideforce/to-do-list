import { ValidationRule } from "quasar"

//任务字典
type missionType = 'dev' | 'document' | 'IO' | 'meeting' | 'thirdparty'

//任务类型种类
type missionTypeName = '开发' | '文档' | 'IO' | '会议' | '第三方'

//类型图标
type typeSvgIcon = 'dev-background' | 'document-background' | 'io-background' | 'meeting-background' | 'thirdparty-background'



//任务种类，添加时使用
type typeitem = {
  typeName: missionTypeName,
  typeDesrciption: string,
  typeSvg: typeSvgIcon
}
//翻页界面卡片的必传参数
interface cardBoxItem {
  type: 'error' | 'warning' | 'timeout' | 'timing',
  time: number,
  descripiton: string,
  content: string,
  drift: number,
  scale: number,
  title?: string,
  missionType?: missionType,
  star?: number,
}
//添加必传参数
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

interface ValidationRuleMap {
  'title': ValidationRule[],
  'missionType': ValidationRule[],
  'time': ValidationRule[],
  'relate': ValidationRule[],
  'link': ValidationRule[],
  'descripiton': ValidationRule[],
}
export type { missionType, missionTypeName, typeSvgIcon, typeitem, cardBoxItem, missTypeObject, ValidationRuleMap }