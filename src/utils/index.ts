type timeDelay = {
    days: string,
    delayType: `warning` | `proceed` | `unexpired`
}
const operationTime = function (time: number): timeDelay {
    const now = new Date().getTime()
    const timeStamp = new Date(time).getTime()
    if (timeStamp < now) {
        const days = Math.floor((now - timeStamp) / (24 * 3600 * 1000))
        return {
            days: `已经过期${days}天`,
            delayType: `warning`
        }
    }
    else {
        const days = Math.floor((timeStamp - now) / (24 * 3600 * 1000))
        if (days === 0) {
            return {
                days: `就在今天`,
                delayType: `proceed`
            }
        }
        else {
            return {
                days: `还剩${days}天`,
                delayType: `unexpired`
            }
        }
    }
}
export {
    operationTime
}