import { Command } from 'commander'
// import create from "./command/create";
import { clone } from "./utils/clone";

const program = new Command('arceus');

program
    .version("0.0.1");

program
    .command('update')
    .description('更新 arceus 至最新版本')
    .action(async (cmd, test) => {
        console.log(cmd)
        console.log(test)
        console.log('update command');
    });

program
    .command('create')
    .description('创建一个新项目')
    .argument('<name>', '项目名称')
    .option('-f, --force', '强制覆盖当前项目目录')
    .action(async (name, options) => {
        // create(name);
        await clone("git@github.com:LonelySnowman/arceus-cli.git");
        console.log(name, options);
        console.log('create command');
    });

program.parse();