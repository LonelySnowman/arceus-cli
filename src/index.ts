import { Command } from 'commander'
import create from "./command/create";
import update from "./command/update";
import { isNeedUpdate } from "./utils/npm";
import { version, name } from "./constants";

const program = new Command('arceus');

program
    .version(version);

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
    .action(async (dirName, options) => {
        await isNeedUpdate(name, version);
        await create(dirName);
    });

program.parse();
