import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import log from './log';
import createLogger from 'progress-estimator';
import chalk from 'chalk';

const logger = createLogger({
    spinner: {
        interval: 300, // 变换时间 ms
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
            chalk.blue(item),
        ),
    },
});

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
};

export const clone = async (
    url: string,
    prjName: string,
    options: string[],
): Promise<any> => {
    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, prjName, options), '代码急速下载中: ', {
            estimate: 7000,
        });

        console.log();
        console.log(chalk.blueBright(`==================================`));
        console.log(chalk.blueBright(`=== 欢迎使用 arceus-cli 脚手架 ===`));
        console.log(chalk.blueBright(`==================================`));
        console.log();

        log.success(`项目创建成功 ${chalk.blueBright(prjName)}`);
        log.success(`执行以下命令启动项目：`);
        log.info(`cd ${chalk.blueBright(prjName)}`);
        log.info(`${chalk.yellow('pnpm')} install`);
        log.info(`${chalk.yellow('pnpm')} run dev`);
    } catch (err: any) {
        log.error('下载失败');
        log.error(String(err));
    }
};
