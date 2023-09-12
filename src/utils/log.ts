import chalk from "chalk";

export const log = {
    error: (msg: string) => {
        console.log(chalk.red('✖ '), msg)
    },
    success: (msg: string) => {
        console.log(chalk.green('✔ '), msg)
    },
    warning: (msg: string) => {
        console.log(chalk.yellow('⚠ '), msg)
    }
}

export default log
