import { app, shell } from 'electron'
import fs from 'node:fs'
import { promises } from 'original-fs'
import path from 'path'
const dirPath = app.getAppPath() + '\\cache'


const createDir = async function (filePath: string) :Promise<Boolean | any>{
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    //没有目录则进行创建目录
                    console.log('folder not exist');
                    fs.mkdir(filePath, (err) => {
                        if (err) {
                            reject(err)
                            console.error(err);
                        } else {
                            console.log('create success or already exist');
                            resolve(true)
                        }
                    });
                } else {
                    reject(err)
                    console.error('发生错误', err);
                }
            } else {
                if (stats.isDirectory()) {
                    resolve(true)

                } else {
                    reject()
                    console.log('path/to/folder not the same folder');
                }
            }
        });
    })

}

export default createDir