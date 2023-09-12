import process from "child_process"
import log from "../utils/log";
import ora from "ora";

const spinner = ora('arceus 更新中~\n')
spinner.color = "yellow"

// 项目创建流程
export default async function update() {
    spinner.start()
    await process.exec('npm install arceus-cli -g', (error) => {
        if (!error) {
            log.success("更新成功~");
        } else {
            log.error("更新失败，请检查 npm 环境~");
            spinner.stop()
        }
        spinner.stop()
    });
}