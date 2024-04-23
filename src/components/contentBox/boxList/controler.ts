import { missTypeObject } from "@/type"

//为了方便动画的执行，需要创建一个类来动态的监听
const driftConfig = [115, 90, 65, 40, 15, -10, -35]
const scaleConfig = [1, 0.95, 0.9, 0.85, 0.80, 0.75, 0.70, 0.65]
type configName = 'drift' | 'zIndex' | 'scale'
export class animationConfig {
    drift: any[]
    zIndex: any[]
    scale: any[]
    len:number
    constructor() {
        this.drift = []
        this.zIndex = []
        this.scale = []
        this.len = 0
    }
    //先不做数组大于7的判断
    generateList(len: number) {
        this.drift = driftConfig.slice(0,len)
        this.drift = this.drift.reverse()
        this.scale = scaleConfig.slice(0,len)
        this.scale = this.scale.reverse()
        this.len = len
        for (let i = 0; i < len; i++) {
            this.zIndex[i] = i + 1
        }
    }
    //重新构建动画参数
    rebuildList(index: number) {

    }
    //获取参数，根据index等来获取参数
    getConfig(index: number, type: configName) {
        return this[type][index]
    }
    //动画时移动动画参数
    animationList(arrowType: string) {
        arrayOperation(this.drift, arrowType)
        arrayOperation(this.scale, arrowType)
        arrayOperation(this.zIndex, arrowType)
    }
}

const arrayOperation = (val: number[], type: string) => {
    const target = type === 'down' ? val.shift() : val.pop();
    type === 'down' ? val.push(target!) : val.unshift(target!);
}