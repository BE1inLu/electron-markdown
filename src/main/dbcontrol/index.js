import { setdbPath } from "sqlite-electron";
import { log } from "console";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";
// import * as fs from 'fs';
import { executeScript } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    log("readdb");
    const devdatapath = "./userdb.sqlite3"
    var testbool
    // 判断能不能检索数据库，无则创建db
    // 判断数据库能否读取，不能就初始化数据库
    await setdbPath(devdatapath)
    executeQuery("SELECT * FROM markdowntable ", "all").then((req) => {
        console.log("select test: " + req)
        return testbool = true
    }).catch((resp) => {
        log(resp)
        console.error("search table error")
        console.log("create table")
        log("script zoom")
        const script = "CREATE TABLE `markdowntable` (`uuid` text NOT NULL,`content` blob,`createdate` text,`exchangedate` text,PRIMARY KEY (`uuid`));"
        executeScript(script).then((req) => {
            log("script req:" + req)
            return testbool = true
        }).catch((resp) => {
            log(resp)
            console.error("err script")
        })
    })
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
    const querystr = "UPDATE markdowntable SET content = ? , exchangedate = ?  WHERE uuid = ?"
    const dbvalues = [value, updatefiledate, uuid]
    return await executeQuery(
        querystr, '', dbvalues
    )
}

// 数据库删除
export async function deletefilebydb(uuid) {
    log("deletefilebydb")
    const querystr = "DELETE FROM markdowntable WHERE uuid = ?"
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

// function dbcheck(path) {
//     var dbchecklocalbool = false
//     executeQuery("SELECT * FROM markdowntable ", "all").then((req) => {
//         log("select test: " + req[0])
//         dbchecklocalbool = true
//         return dbchecklocalbool
//     }).catch((resp) => {
//         log(resp)
//         console.error("search table error")
//         console.log("create table")
//         log("script zoom")
//         const script = "CREATE TABLE `markdowntable` (`uuid` text NOT NULL,`content` blob,`createdate` text,`exchangedate` text,PRIMARY KEY (`uuid`));"
//         executeScript(script).then((req) => {
//             log("script req:" + req)
//             dbchecklocalbool = true
//             return dbchecklocalbool
//         }).catch((resp) => {
//             log(resp)
//             console.error("err script")
//         })
//     })
//     return dbchecklocalbool
// }
