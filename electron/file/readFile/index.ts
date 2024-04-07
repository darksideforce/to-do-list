
import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
import { readdirSync, readfileSync, fileExistSync } from '../uitls'
const dirPath = app.getAppPath() + '\\cache'

/**
 * 
 * @param filePath 文件路径，基于根目录
 * @returns 读取的文件对象
 */
const readFile = async function (event, filePath: string): Promise<string|void[]> {
    return new Promise(async (resolve, reject) => {

        try {
            if (await fileExistSync(dirPath)) {
                const res = await readdirSync(dirPath);
                let list = []
                for (let i of res) {
                    const fileRes = await readdirSync(dirPath + '\\' + i)
                    for (let j of fileRes) {
                        const result = await readfileSync(dirPath + '\\' + i + '\\' + j)
                        list.push(Object.assign(JSON.parse(result), { id: `${i}?${j}` }))
                    }
                }
                resolve(list)
            }
            else{
                resolve([])
            }

        }
        catch (e) {
            console.log(e)
            reject(e)
        }


    })
}

export default readFile