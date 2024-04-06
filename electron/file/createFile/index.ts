import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
import createDir from '../createDir'

const dirPath = app.getAppPath() + '\\cache'
const currentDate = new Date();
const dateString = currentDate.toLocaleDateString('zh-CN');
const [year, month, day] = dateString.split('/');
const filePath = app.getAppPath() + '\\cache\\' + year + '-' + month + '-' + day //+ '.json'


/**
 * 生成随机文件名
 * @param length 文件名长度
 * @returns 返回生成的文件名
 */
const generaName =function (length) {
    const data =
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
        "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z"];
    let nums = "";
    for (let i = 0; i < length; i++) {
      const r = parseInt(Math.random() * 61 + '', 10);
      nums += data[r];
    }
    return nums;
  }


/**
 * 创建文件
 * @param event 
 * @param message 文件内的文本 
 * @returns 
 */
const createFile = async function (event, message: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            await createDir(dirPath)
            await createDir(filePath)
            const fileName = filePath + '\\' + generaName(20)  + '.json'
            await write(fileName, message)
            resolve(true)
        }
        catch (e) {
            reject(false)
            console.error('create file error', e)
        }
    })

}
/**
 * 写入
 * @param filePath 文件路径 
 * @param content 文件内容
 * @returns 失败或成功
 */
const write = function (filePath: string, content: string = ''): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(filePath, content, 'utf-8', (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

export default createFile