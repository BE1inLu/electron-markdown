import { setdbPath } from "sqlite-electron";
import { log } from "console";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";
import * as fs from 'fs';
import { executeScript } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    log("readdb");
    const devdatapath = "./basedb.sqlite3"
    // const userdatapath = "../../src/renderer/src/assets/database/basedb.sqlite3"
    var testbool
    // 1，判断路径有无数据，有则读取，无则add
    // 2，判断能不能检索数据库，无则创建db
    if (pathcheck(devdatapath)) {
        // 判断数据库能否读取，不能就初始化数据库
        dbcheck()
        const localbool = dbcheck()
        log("readdb localbool: " + localbool)
        testbool = await setdbPath(devdatapath)
        // if (localbool) {
        //     console.error("load db error!")
        //     await setdbPath(userdatapath)
        // }
    }
    return testbool
}

// 数据库插入（保存并创建）
export async function createmdfilebydb(content) {
    log("savefilebydb")

    var fileuuid = uuid4().replace(/-/g, '')
    var createfiledate = new Date().toLocaleDateString()
    log(content)
    log("createdate: " + createfiledate)
    log(fileuuid)

    const querystr = "INSERT INTO markdowntable (uuid,content,createdate,exchangedate) VALUES (?,?,?,?)"
    const dbvalues = [fileuuid, content, createfiledate, createfiledate]
    // const fetch = ''
    return await executeQuery(
        querystr, '', dbvalues)
}

// 数据库插入（保存并更新）
export async function overloadfilebydb(uuid, value) {
    log("ovewrloadfilebydb")
    var updatefiledate = new Date().toLocaleDateString()
    const querystr = "UPDATE basedb SET content = ? , exchangedate = ?  WHERE UUID = ?"
    const dbvalues = [value, updatefiledate, uuid]
    return await executeQuery(
        querystr, '', dbvalues
    )
}

// 数据库删除
export async function delfilebydb(uuid) {
    log("ovewrloadfilebydb")
    const querystr = "DELETE basedb WHERE UUID = ?"
    const dbvalues = [uuid]
    return await executeQuery(querystr, '', dbvalues)
}

// 查看数据库数据
export async function readallabdata() {
    log("readall func")
    const fetch = "all"
    try {
        return await executeQuery(
            "SELECT * FROM markdowntable ", fetch
        )
    } catch (err) {
        log(err)
    }
    return null
}

export async function loaddbdatabyuuid(uuid) {
    try {
        log("uuid: ")
        log("uuid: " + uuid.value)
        log("typeof" + typeof uuid.value)
        const querystr = "SELECT content FROM markdowntable WHERE uuid =?"
        const dbvalues = [uuid.value]
        log(dbvalues)
        return await executeQuery(querystr, 'all', dbvalues)
    } catch (err) {
        log(err)
    }
}

function pathcheck(devpath) {
    log("pathccheck")
    try {
        const stat = fs.statSync(devpath)
        log(stat)
        return true
    } catch (err) {
        log(err)
        try {
            fs.appendFileSync(devpath, '')
            return true
        } catch (error) {
            log(error)
        }
        return false
    }
}

function dbcheck() {
    log("dbcheck")
    var dbchecklocalbool = false
    executeQuery("SELECT * FROM markdowntable ", "all").then((req) => {
        log("select test: " + req[0])
        dbchecklocalbool = true
    }).catch((resp) => {
        log(resp)
        console.error("search table error")
        log("script zoom")
        const script = "CREATE TABLE `markdowntable` (`uuid` text NOT NULL,`content` blob,`createdate` text,`exchangedate` text,PRIMARY KEY (`uuid`));"
        executeScript(script).then((req) => {
            log("script req:" + req)
            dbchecklocalbool = true
        }).catch((resp) => {
            log(resp)
            console.error("err script")
        })
    })
    log("dbcheck bool: " + dbchecklocalbool)
    return dbchecklocalbool
}
