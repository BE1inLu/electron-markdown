import { setdbPath } from "sqlite-electron";
import { log } from "console";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";

// 读取database.db
export async function readdb() {
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
    return await executeQuery(
        "UPDATE basedb SET content = ? , update = ?  WHERE UUID = ?", [value, updatefiledate, uuid]
    )
}

// 查看数据库数据
export async function readallabdata() {
    log("readall")
    const fetch = "all"
    return await executeQuery(
        "SELECT * FROM markdowntable ", fetch
    )
}

