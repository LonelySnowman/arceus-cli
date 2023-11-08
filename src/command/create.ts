import { select, input } from '@inquirer/prompts';
import { templates } from "../constants";
import { TemplateInfo } from "../types";
import { clone } from "../utils/clone";
import log from "../utils/log";
import path from "path";
import fs from "fs-extra";
import { isOverwrite } from "../utils/file";

// 项目创建流程
export default async function create(prjName: string) {
    // 初始化模板列表
    const templateList = [...templates.entries()].map((item: [string, TemplateInfo]) => {
        const [name, info] = item;
        return {
            name,
            value: name,
            description: info.description
        }
    })

    // 文件名称未传入需要输入
    if (!prjName) prjName = await input({ message: '请输入项目名称' });
    // 文件已存在处理
    const filePath = path.resolve(process.cwd(), prjName)
    if (fs.existsSync(filePath)) {
        const run = await isOverwrite(prjName)
        if (run) {
            await fs.remove(filePath)
        } else {
            return
        }
    }

    // 选择模板
    const templateName = await select({
        message: '请选择需要初始化的模板:',
        choices: templateList,
    });
    const gitRepoInfo = templates.get(templateName)
    if (gitRepoInfo) {
        await clone(gitRepoInfo.downloadUrl , prjName, ['-b', `${gitRepoInfo.branch}`])
    } else {
        log.error(`${templateName} 模板不存在`)
    }
}
