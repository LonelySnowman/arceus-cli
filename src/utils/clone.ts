import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import log from "./log";
import createLogger from "progress-estimator";
import chalk from "chalk";

export const logger = createLogger({
    spinner: {
        interval: 300, // 变换时间 ms
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item))
    }
})

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
};

export const clone = async (url: string, prjName: string, options: string[]): Promise<any> => {
    const git: SimpleGit = simpleGit(gitOptions)
    try {
        await logger(git.clone(url, prjName, options), '代码急速下载中: ', {
            estimate: 7000
        })
        log.success("下载成功 ~")
    } catch (err: any) {
        log.error("下载失败")
        log.error(String(err))
    }
}
