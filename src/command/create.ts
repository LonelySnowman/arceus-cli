import { select } from '@inquirer/prompts';
import { templates } from "../constants";
import { TemplateInfo } from "../types";
import { clone } from "../utils/clone";
import log from "../utils/log";

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
    const templateName = await select({
        message: '请选择需要初始化的模板:',
        choices: templateList
    });
    const gitRepoInfo = templates.get(templateName)
    if (gitRepoInfo) {
        await clone(gitRepoInfo.downloadUrl , prjName, ['-b', `${gitRepoInfo.branch}`])
    } else {
        log.error(`${templateName} 模板不存在`)
    }
}
