import { select } from '@inquirer/prompts';

// 项目创建流程
export default async function create(name?: string, option?: any) {
    console.log(option);
    // console.log(name)
    // const inputName = await input({ message: '请输入项目名称' });
    // 选择模板名称
    const templateName = await select({
        message: 'Select a package manager',
        choices: [
            {
                name: 'sv3-template',
                value: 'sv3-template',
                description: 'Vue3快速开发模板',
            }
        ]
    });
    console.log(name, templateName);
}