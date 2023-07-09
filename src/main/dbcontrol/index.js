import { setdbPath } from "sqlite-electron";
import { log } from "console";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    log("readdb");
    var userdatapath = "../../src/renderer/src/assets/database/basedb.sqlite3"
    log(userdatapath)
    var testbool = await setdbPath(userdatapath)
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
        return await executeQuery("SELECT * FROM markdowntable WHERE UUID = ?", '', [uuid])
    } catch (err) {
        log(err)
    }
}

