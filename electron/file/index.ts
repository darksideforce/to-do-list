import { app, shell } from 'electron'
import fs from 'node:fs'
//开始创建本地缓存文件，把目录信息存储在本地
const fileAdd = function (event, message: string) {
    console.log('value', message)
    let filePath = app.getAppPath()+'\\example.json'
    console.log(filePath)
    fs.writeFile(filePath, message, 'utf-8', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('write success');
        }
    })
}

//删除本地文件
const fileDelete = function () { }

//编辑
const fileEdit = function () {

}
//导入
const fileFind = function () { }
export {
    fileAdd
}