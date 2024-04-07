import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
import { fileExistSync, readfileSync, writefileSync } from '../uitls'
const dirPath = app.getAppPath() + '\\cache'
/**
 * 
 * @param event 
 * @param item 由渲染层传入的json字符串。根据字符串内的指定对象开始进行查找 
 * @returns 
 */
const finishFile = async function (event, item: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        //开始解读
        try {
            //开始匹配
            const [dirName, fileName] = JSON.parse(item).id.split('?')
            await fileExistSync(dirPath)
            await fileExistSync(dirPath + '\\' + dirName)
            await fileExistSync(`${dirPath}\\${dirName}\\${fileName}`)
            let fileResult = await readfileSync(`${dirPath}\\${dirName}\\${fileName}`)
            fileResult = JSON.parse(fileResult)
            fileResult.completionStatus = 'complete'
            fileResult = JSON.stringify(fileResult)
            console.log(fileResult)
            //准备写入
            await writefileSync(`${dirPath}\\${dirName}\\${fileName}`,fileResult)
            console.log(`edit file done`)
            resolve(true)
        }
        catch (e) {
            console.log(`finish file error ,error is ${e.message}`)
            reject(e)
        }

    })
}
export default finishFile