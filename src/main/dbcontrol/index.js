import { dialog } from "electron";
import { setdbPath } from "sqlite-electron";

export async function readdb() {
    console.log("readdb");
    var localpath;
    await dialog.showOpenDialog({
        title: '读取文件',
        buttonLabel: '选择',
        defaultPath: '',
        filters: [
            { name: 'database', extensions: ["db"] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile'],
    }).then((res) => {
        localpath = res.filePaths[0]
    }).catch((req) => {
        console.log(req);
    })

    console.log("返回path");
    console.log(localpath);

    var teststr = "../../render/src/assets/database/basedb.db"

    try {
        console.log("setdbpath");
        return await setdbPath(teststr)
    } catch (err) {
        console.log(err);
    }

    return null
}

// export async function readdbPath(dbpath) {
//     return await setdbPath(dbpath)
// }

// export async function loaddball() {
//     return await executeQuery(
//         "SELECT * FROM sqlite"
//     )
// }
