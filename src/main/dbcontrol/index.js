import { setdbPath } from "sqlite-electron";
import { log } from "console";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";

// 读取database.db
export async function readdb() {
    log("readdb");
    var userdatapath = "../../src/renderer/src/assets/database/basedb.db"
    log(userdatapath)
    var testbool = await setdbPath(userdatapath)
    return testbool
}

// 数据库插入（保存并创建）
export async function createmdfilebydb(content) {
    log("savefilebydb")
    var fileuuid = uuid4()
    var createfiledate = new Date().toLocaleDateString()
    log("createdate: " + createfiledate)
    return await executeQuery(
        "INSERT INTO basedb (uuid,content,createupdate,insertupdate) VALUES (?,?,?,?)", null,
        [fileuuid, content, createfiledate, createfiledate]
    )
}

// 数据库插入（保存并更新）
export async function overloadfilebydb(uuid, value) {
    log("ovewrloadfilebydb")
    var updatefiledate = new Date().toLocaleDateString()
    return await executeQuery(
        "UPDATE basedb SET content = ? , update = ?  WHERE UUID = ?", [value, updatefiledate, uuid]
    )
}

export async function readall() {
    log("readall")
    return await executeQuery(
        "SELECT * FROM basedb "
    )
}

