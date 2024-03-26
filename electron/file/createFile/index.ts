import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
import createDir from '../createDir'

const dirPath = app.getAppPath() + '\\cache'
const currentDate = new Date();
const dateString = currentDate.toLocaleDateString('zh-CN');
const [year, month, day] = dateString.split('/');
const filePath = app.getAppPath() + '\\cache\\' + year + '-' + month + '-' + day //+ '.json'

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

const createFile = async function (event, message: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            await createDir(dirPath)
            await createDir(filePath)
            const fileName = filePath + '\\' + generaName(20)  + '.json'
            await write(fileName, message)
        }
        catch (e) {
            console.error('create file error', e)
        }
    })
    // fs.stat(filePath, (err, stats) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             //没有目录则进行创建目录
    //             console.log('folder not exist');
    //             fs.mkdir(filePath, (err) => {
    //                 if (err) {
    //                     console.error(err);
    //                 } else {
    //                     console.log('create success or already exist');
    //                     write(fileName, message)
    //                 }
    //             });
    //         } else {
    //             console.error('发生错误', err);
    //         }
    //     } else {
    //         if (stats.isDirectory()) {
    //             console.log('folder already exist');
    //             write(fileName, message)

    //         } else {
    //             console.log('path/to/folder not the same folder');
    //         }
    //     }
    // });
}
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