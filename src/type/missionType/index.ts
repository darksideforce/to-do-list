type missionType = 'dev' | 'document' | 'IO' | 'meeting' | 'thirdparty'

type missionTypeName = '开发' | '文档' | 'IO' | '会议' | '第三方'

type typeSvgIcon = 'dev-background' | 'document-background' | 'io-background' | 'meeting-background' | 'thirdparty-background'

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
  missionType?: missionType
}
export type { missionType, missionTypeName, typeSvgIcon, typeitem ,cardBoxItem}