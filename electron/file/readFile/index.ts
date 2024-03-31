
import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
const dirPath = app.getAppPath() + '\\cache'

const readdirSync = async function (params: string): Promise<any> {
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

const readfileSync = async function (params: string): Promise<any> {
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
 * 
 * @param filePath 文件路径，基于根目录
 * @returns 读取的文件对象
 */
const readFile = async function (filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(dirPath, async (err, stats) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('folder not exist');
                        resolve('')
                    } else {
                        console.error('发生错误', err);
                    }
                } else {

                    if (stats.isDirectory()) {
                        //找寻到对应文件夹
                        try {
                            const res = await readdirSync(dirPath);
                            let list = []
                            for (let i of res) {
                                const fileRes = await readdirSync(dirPath + '\\' + i)
                                for (let j of fileRes) {
                                    const result = await readfileSync(dirPath + '\\' + i + '\\' + j)
                                    list.push(JSON.parse(result))
                                }
                            }
                            resolve(list)
                        }
                        catch (e) {
                            console.log(e)
                            reject(e)
                        }
                    } else {
                        console.log('path/to/folder not the same folder');
                        reject([])
                    }
                }
            })
        }
        catch (e) {
            console.log(`e=${e}`)
            reject(e)
        }
    })
}

export default readFile