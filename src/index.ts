import { Command } from 'commander'
import create from "./command/create";
import update from "./command/update";

const program = new Command('arceus');

program
    .version("0.0.1");

program
    .command('update')
    .description('更新 arceus 至最新版本')
    .action(async () => {
        await update()
    });

program
    .command('create')
    .description('创建一个新项目')
    .argument('<name>', '项目名称')
    .option('-f, --force', '强制覆盖当前项目目录')
    .action(async (name, options) => {
        console.log(name, options)
        await create(name);
    });

program.parse();