import * as sqlite from "sqlite-electron";
import { app, dialog } from "electron";

export async function createdb() {
    var localdbpath = async () => {
        var localpath = null;
        await dialog.showOpenDialog({
            title: '设置 sqlite 目录',
            buttonLabel: '选择并创建',
            defaultPath: app.getPath('documents'),
            properties: ['openDirectory'],
        }).then((res) => {
            console.log("读取path：")
            console.log(res)
            localpath = res.filePaths[0]
        }).catch((req) => {
            console.log(req);
        })
        return localpath
    }
    return await sqlite.setdbPath(localdbpath)
}


export async function readdbPath(dbpath) {
    return await sqlite.setdbPath(dbpath)
}

export async function loaddball(){
    return await sqlite.executeQuery(
        "SELECT * FROM sqlite.db"
    )
}
