import { dialog } from "electron";
import fs from 'fs';

export function savemarkdownfile(content) {
    dialog
        .showSaveDialog({
            filters: [
                {
                    name: "markdown",
                    extensions: ["md"],
                },
            ],
            defaultPath: '',
            message: "选择要导出到的目录",
            buttonLabel: "保存",
            title: "保存到...",
        })
        .then((res) => {
            // 输出日志
            console.log(res);
            fs.writeFileSync(res.filePath, content);
        })
        .catch((req) => {
            console.log(req);
        });
}

export async function loadmarkdownfile() {
    var localdata;
    await dialog.showOpenDialog({
        filters: [
            { name: 'Markdown', extensions: ["md"] },
            { name: 'All Files', extensions: ['*'] }
        ],
        buttonLabel: "读取",
        defaultPath: '',
        title: "读取文件",
    }).then((res) => {
        console.log("读取path：")
        console.log(res)
        localdata = fs.readFileSync(res.filePaths[0], 'utf-8')
        console.log("读取localdata")
        console.log(localdata)
    }).catch((req) => {
        console.log(req);
        return
    });
    return localdata
}