import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import log from "./log";
import createLogger from "progress-estimator";
import chalk from "chalk";

export const logger = createLogger({
    spinner: {
        interval: 300, // 变换时间 ms
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.yellow(item))
    }
})

const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

export const clone = async (repo: string): Promise<any> => {
    const git: SimpleGit = simpleGit(options)
    try {
        await logger(git.clone(repo), '代码急速下载中: ', {
            estimate: 7000
        })
        log.success("下载成功~")
    } catch (err: any) {
        log.error("下载失败：")
        log.error(String(err))
    }
}