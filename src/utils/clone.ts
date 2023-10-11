import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import log from "./log";
import createLogger from "progress-estimator";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { isOverwrite } from "./file";

const logger = createLogger({
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
    let run: boolean = true
    const filePath = path.resolve(process.cwd(), prjName)
    if (fs.existsSync(filePath)) {
        run = await isOverwrite(prjName)
        if (run) await fs.remove(filePath)
    }
    if (run) {
        const git: SimpleGit = simpleGit(gitOptions)
        try {
            await logger(git.clone(url, prjName, options), '代码急速下载中: ', {
                estimate: 7000
            })
            console.log(chalk.yellow(`\n=== 欢迎使用 arceus-cli 脚手架 ===\n`))
            log.info(`请依次执行以下命令启动项目 (*^_^*) ~`)
            log.info(`cd ${prjName}`)
            log.info(`pnpm install`)
            log.info(`pnpm run dev`)
        } catch (err: any) {
            log.error("下载失败")
            log.error(String(err))
        }
    }
}
