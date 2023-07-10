import { setdbPath } from "sqlite-electron";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    var userdatapath = "../../src/renderer/src/assets/database/basedb.sqlite3"
    var testbool = await setdbPath(userdatapath)
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
        const querystr="SELECT content FROM markdowntable WHERE uuid =?"
        const dbvalues=[uuid.value]
        return await executeQuery(querystr,'all', dbvalues)
    } catch (err) {
        console.log(err)
    }
}

