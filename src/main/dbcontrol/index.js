import { setdbPath } from "sqlite-electron";
import { v4 as uuid4 } from "uuid"
import { executeQuery } from "sqlite-electron";
import { executeScript } from "sqlite-electron";

// 读取database.db
export async function loaddb() {
    log("readdb");
    const datapath=["./userdb.sqlite3","../../basedb.sqlite3"]
    var testbool
    // 判断能不能检索数据库，无则创建db
    // 判断数据库能否读取，不能就初始化数据库
    await setdbPath(datapath[1])
    executeQuery("SELECT * FROM markdowntable ", "all").then((req) => {
        console.log("select test: " + req)
        return testbool = true
    }).catch(() => {
        const script = "CREATE TABLE `markdowntable` (`uuid` text NOT NULL,`content` blob,`createdate` text,`exchangedate` text,PRIMARY KEY (`uuid`));"
        executeScript(script).then(() => {
            return testbool = true
        }).catch(() => {
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
    const querystr = "INSERT INTO markdowntable (uuid,content,createdate,exchangedate) VALUES (?,?,?,?)"
    const dbvalues = [fileuuid, content, createfiledate, createfiledate]
    return await executeQuery(
        querystr, '', dbvalues)
}

// 数据库插入（保存并更新）
export async function updatefilebydb(uuid, value) {
    log("updatefilebydb")
    var updatefiledate = new Date().toLocaleDateString()
    const querystr = "UPDATE markdowntable SET content = ? , exchangedate = ?  WHERE uuid = ?"
    const dbvalues = [value, updatefiledate, uuid]
    return await executeQuery(
        querystr, '', dbvalues
    ).catch((resp) => {
        console.log(resp)
    })
}

// 数据库删除
export async function deletefilebydb(uuid) {
    const querystr = "DELETE FROM markdowntable WHERE uuid = ?"
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

