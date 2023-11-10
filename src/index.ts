import { Command } from 'commander';
import create from './command/create';
import update from './command/update';
import { version } from '../package.json';

const program = new Command('arceus');

program.version(version, '-v, --version');

program
    .command('update')
    .description('更新 arceus 至最新版本')
    .action(async () => {
        await update();
    });

program
    .command('create')
    .description('创建一个新项目')
    .argument('[name]', '项目名称')
    .action(async (dirName) => {
        await create(dirName);
    });

program.parse();
