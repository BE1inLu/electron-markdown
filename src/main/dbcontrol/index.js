import { setdbPath } from "sqlite-electron";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";
import * as fs from 'fs';
import { executeScript } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    const userdatapath = "./basedb.sqlite3"
    const devdatapath = "../../src/renderer/src/assets/database/devdb.sqlite3"
    var testbool
    // 1，判断路径有无数据，有则读取，无则add
    // 2，判断能不能检索数据库，无则创建db
    if (pathcheck(devdatapath)) {
        // 判断数据库能否读取，不能就初始化数据库
        dbcheck()
        const localbool = dbcheck()
        testbool = await setdbPath(userdatapath)
        if (localbool) {
            console.error("load db error!")
            await setdbPath(devdatapath)
        }
    }
    return testbool
}

// 数据库插入（保存并创建）
export async function createmdfilebydb(content) {
    var fileuuid = uuid4().replace(/-/g, '')
    var createfiledate = new Date().toLocaleDateString()
    const querystr = "INSERT INTO markdowntable (uuid,content,createdate,exchangedate) VALUES (?,?,?,?)"
    const dbvalues = [fileuuid, content, createfiledate, createfiledate]
    return await executeQuery(
        querystr, '', dbvalues)
}

// 数据库插入（保存并更新）
export async function overloadfilebydb(uuid, value) {
    var updatefiledate = new Date().toLocaleDateString()
    const querystr = "UPDATE basedb SET content = ? , exchangedate = ?  WHERE UUID = ?"
    const dbvalues = [value, updatefiledate, uuid]
    return await executeQuery(
        querystr, '', dbvalues
    )
}

// 数据库删除
export async function delfilebydb(uuid) {
    const querystr = "DELETE basedb WHERE UUID = ?"
    const dbvalues = [uuid]
    return await executeQuery(querystr, '', dbvalues)
}

// 查看数据库数据
export async function readallabdata() {
    const fetch = "all"
    try {
        return await executeQuery(
            "SELECT * FROM markdowntable ", fetch
        )
    } catch (err) {
        console.log(err)
    }
    return null
}

export async function loaddbdatabyuuid(uuid) {
    try {

        const querystr = "SELECT content FROM markdowntable WHERE uuid =?"
        const dbvalues = [uuid.value]

        return await executeQuery(querystr, 'all', dbvalues)
    } catch (err) {
        console.log(err)
    }
}

function pathcheck(devpath) {
    try {
        fs.statSync(devpath)
        return true
    } catch (err) {
        try {
            fs.appendFileSync(devpath, '')
            return true
        } catch (error) {
            console.log(error)
        }
        return false
    }
}

function dbcheck() {
    var dbchecklocalbool = false
    executeQuery("SELECT * FROM markdowntable ", "all").then((req) => {
        console.log(req)
        dbchecklocalbool = true
    }).catch((resp) => {
        console.log(resp)
        console.error("search table error")
        const script = "CREATE TABLE `markdowntable` (`uuid` text NOT NULL,`content` blob,`createdate` text,`exchangedate` text,PRIMARY KEY (`uuid`));"
        executeScript(script).then((req) => {
            console.log(req)
            dbchecklocalbool = true
        }).catch((resp) => {
            console.log(resp)
            console.error("err script")
        })
    })
    return dbchecklocalbool
}
