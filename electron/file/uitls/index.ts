import fs from 'node:fs'
import path from 'path'
/**
 * 读取文件夹
 * @param params 文件夹路径
 * @returns 返回该文件夹下的所有文件或者文件夹内容
 */
export const readdirSync = async function (params: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readdir(params, (err, files) => {
            if (err)
                console.log(err);
            else {
                resolve(files)
            }
        })
    })
}
/**
 * 读取文件内容
 * @param params 文件路径
 * @returns 文件内容
 */
export const readfileSync = async function (params: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(params, 'utf8', (error, data) => {
            console.log(`result=${error},${JSON.stringify(data)}`)
            if (error) {
                reject('error')
            }
            resolve(data)
        });
    })
}
/**
 * 判断文件或者文件夹是否存在
 * @param dirPath 文件路径
 * @returns true为目录存在，false为文件存在
 */
export const fileExistSync = async function (dirPath: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        fs.stat(dirPath, async (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log('folder not exist');
                    reject(false)
                } else {
                    reject(false)
                    console.error('发生错误', err);
                }
            } else {
                if (stats.isDirectory()) {
                    resolve(true)
                } else {
                    console.log('path/to/folder not the same folder');
                    resolve(false)
                }
            }
        })
    })
}
/**
 * 异步的写入文件方法
 * @param filePath 写入路径
 * @param content 写入内容
 * @returns 是否写入成功
 */
export const writefileSync = function (filePath: string, content: string = ''): Promise<Boolean> {
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