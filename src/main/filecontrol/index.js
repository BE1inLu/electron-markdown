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