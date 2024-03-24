import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
let dirPath = app.getAppPath() + '\\cache'
/**
 * 开始创建本地缓存文件，把目录信息存储在本地
 * */
const fileAdd = function (event, message: string) {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('zh-CN');
    const [year, month, day] = dateString.split('/');
    let filePath = app.getAppPath() + '\\cache\\' + year + '-' + month + '-' + day + '.json'
    fs.stat(dirPath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('folder not exist');
                fs.mkdir(dirPath, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('create success or already exist');
                        createFile(filePath, message)
                    }
                });
            } else {
                console.error('发生错误', err);
            }
        } else {
            if (stats.isDirectory()) {
                console.log('folder already exist');
                createFile(filePath, message)

            } else {
                console.log('path/to/folder not the same folder');
            }
        }
    });
}

//删除本地文件
const fileDelete = function () { }

//编辑
const fileEdit = function () {

}
/** 
 *      导入,查找本地文件，并进行读取
 * */
const fileFind = async function (filePath) {
    console.log(`enter fildFind`)
    // return new Promise((resolve, reject) => {
    fs.stat(dirPath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('folder not exist');
                // resolve('')
            } else {
                console.error('发生错误', err);
            }
        } else {
            if (stats.isDirectory()) {
                //找寻到对应文件夹
                const jsonFileList = fs.readdirSync(dirPath).filter(file => path.extname(file).toLowerCase() === '.json');
                let result = []
                jsonFileList.forEach(ele => {
                    fs.readFile(dirPath +  '\\' +  ele, 'utf8', (error, data) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        result.push(data)
                    });
                })
                return result
            } else {
                console.log('path/to/folder not the same folder');
            }
        }
    })
    // })
}

//创建文件夹，把指定文件夹存储在指定位置
/**
 * 
 * @param filePath 文件路径
 * @param content 文件内容
 */
const createFile = function (filePath: string, content: string = '') {
    fs.writeFile(filePath, content, 'utf-8', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('write success');
        }
    })
}
export {
    fileAdd,
    fileFind
}