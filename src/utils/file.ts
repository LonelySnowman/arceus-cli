import { select } from '@inquirer/prompts';
import log from './log';

export const isOverwrite = async (fileName: string) => {
    log.warning(`${fileName} 文件已存在 !`);
    return select({
        message: '是否覆盖原文件: ',
        choices: [
            { name: '覆盖', value: true },
            { name: '取消', value: false },
        ],
    });
};
