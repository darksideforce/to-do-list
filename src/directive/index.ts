import { Resize } from "./sizeob"
import { LongPress } from './longpress'

// 自定义指令集合,为key值键值对，key为注册的自定义指令名
const directives: any = {
    SizeOb: Resize,
    longpress: LongPress
}

export default {
    install(app: any) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    }
}
