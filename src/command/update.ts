import process from 'child_process';
import log from '../utils/log';
import ora from 'ora';
import chalk from 'chalk';

const spinner = ora({
    text: 'arceus 更新中 ~\n',
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
            chalk.blue(item),
        ),
    },
});

// 项目创建流程
export default function update() {
    spinner.start();
    process.exec('npm install arceus-cli@latest -g', (error) => {
        spinner.stop();
        if (!error) {
            log.success('更新成功 ~');
        } else {
            log.error(`${error}`);
        }
    });
}
