import  {Resize}  from "./sizeob"


// 自定义指令集合,为key值键值对，key为注册的自定义指令名
const directives:any = {
    SizeOb:Resize,
}

export default {
    install(app:any) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    }
}
