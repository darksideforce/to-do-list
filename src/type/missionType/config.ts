import { ValidationRule } from "quasar"
import { typeitem, ValidationRuleMap } from "."

//用于配置项
const addTypeList: typeitem[] = [
    { typeName: '开发', typeDesrciption: '开发，bug单，demo等事务', typeSvg: 'dev-background', type: 'dev' },
    { typeName: '文档', typeDesrciption: '上架文档，更新文档', typeSvg: 'document-background', type: 'document' },
    { typeName: 'IO', typeDesrciption: '工作电子流，请加权限等处理', typeSvg: 'io-background', type: 'IO' },
    { typeName: '会议', typeDesrciption: '设计串讲showcase等', typeSvg: 'meeting-background', type: 'meeting' },
    { typeName: '第三方', typeDesrciption: '第三方bug，或者问题验证', typeSvg: 'thirdparty-background', type: 'thirdparty' },
]

const rulesMap: ValidationRuleMap = {
    title: [
        val => (val && val.length > 0) || '事务名称为空'
    ],
    missionType: [
        val => (val && val.length > 0) || '事务类别为空'
    ],
    time: [
        val => (val && val.length > 0) || '事务事件为空'
    ],
    relate: [
        val => (val && val.length > 0) || '事务联系人为空'
    ],
    link: [
        val => (val && val.length > 0) || '事务链接为空'
    ],
    descripiton: [
        val => (val && val.length > 0) || '事务详细描述为空'
    ],
    date: [
        val => (val && val.length > 0) || '事务日期为空'
    ],
    type: {
        rule: '',
        tips: '事务类型为空'
    }
}

export {
    addTypeList,
    rulesMap
}