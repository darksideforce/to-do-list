
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
const readFile = async function (filePath) {
    return new Promise((resolve, reject) => {
        console.log(`enter fildFind`)
        try {
            fs.stat(dirPath, async(err, stats) => {
                console.log(`err = ${err}`)
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('folder not exist');
                        resolve('')
                    } else {
                        console.error('发生错误', err);
                    }
                } else {
                    console.log(`stats = ${stats.isDirectory()}`)
                    if (stats.isDirectory()) {
                        //找寻到对应文件夹
                        const res = await readdirSync(dirPath);
                        let list = []
                        console.log(1)
                        try{
                            for(let i of res){
                                const fileRes = await readdirSync(dirPath + '\\' + i)
                                for(let j of fileRes){
                                    const result = await readfileSync(dirPath + '\\' + i + '\\' + j)
                                    list.push(JSON.parse(result))
                                }
                            }
                            console.log(list)
                            resolve(list)
                        }
                        catch(e){
                            console.log(e)
                            reject(e)
                        }
                        
                        // const doubleRes = await readdirSync(dirPath + '\\' + res)
                        // //TODO 需要加上遍历多层目录的逻辑
                        // console.log(res)
                        // const jsonFileList = res.filter(file => path.extname(file).toLowerCase() === '.json')
                        // console.log(jsonFileList)
                        // let result = []
                        // if (jsonFileList) {
                        //     console.log(1)
                        //     jsonFileList.reduce(async ele=>{
                        //         const data = await readfileSync('dirPath' + '\\' + ele)
                        //         result.push(JSON.parse(data))
                        //     })
                        //     console.log(2)
                        //     resolve(result)
                        //     // jsonFileList.forEach(ele => {
                        //     //     console.log(`ele=${ele}`)
                        //     //     fs.readFile(dirPath + '\\' + ele, 'utf8', (error, data) => {
                        //     //         console.log(`result=${error},${JSON.stringify(data)}`)
                        //     //         if (error) {
                        //     //             console.error(error);
                        //     //             reject('error')
                        //     //         }
                        //     //         result.push(JSON.parse(data))
                        //     //         resolve(result)
                        //     //     });
                        //     // })
                        // }
                        // else {
                        //     console.log(2)
                        //     reject([])
                        // }

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