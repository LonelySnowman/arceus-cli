import { select } from '@inquirer/prompts';
import log from "./log";

export const isOverwrite = async (npmName: string) => {
    log.warning('原文件已存在 !')
    const overwrite = await select({
        message: '是否覆盖原文件: ',
        choices: [
            { name: '覆盖', value: true },
            { name: '取消', value: false }
        ]
    })
    return overwrite
}
