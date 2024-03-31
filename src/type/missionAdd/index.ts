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

//添加的必传参数
interface missTypeObject {
  time: string,
  descripiton: string,
  content: string,
  title?: string,
  missionType?: missionType,
  star?: number,
  relate?: string,
  link?: string,
  createTime:Number | any,
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
  missTypeObject,
  ValidationRuleMap,
  selftRule
}