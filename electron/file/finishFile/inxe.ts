import { app, shell } from 'electron'
import fs from 'node:fs'
import path from 'path'
const dirPath = app.getAppPath() + '\\cache'
const finishFile = async function(event,item):Promise<boolean>{
    return new Promise((resolve,reject)=>{
        console.log(`item=${item}`)
        resolve(true)
    })
}
export default finishFile