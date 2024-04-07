import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
import createDir from '../createDir'
import { writefileSync } from '../uitls'

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
            await writefileSync(fileName, message)
            resolve(true)
        }
        catch (e) {
            reject(false)
            console.error('create file error', e)
        }
    })

}


export default createFile