 const operationTime = function(time:number):string{
    const now = new Date().getTime()
    const timeStamp = new Date(time).getTime()
    if(timeStamp < now){
        const days = Math.floor((now - timeStamp) / (24*3600 * 1000))
        return `已经过期${days}天`
    }
    else{
        const days = Math.floor((timeStamp - now) / (24*3600 * 1000))
        return `还剩${days}天`
    }
}
export {
    operationTime
}