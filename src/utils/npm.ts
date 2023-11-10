import axios, { AxiosResponse } from 'axios';
import * as lodash from 'lodash';
import log from './log';
import chalk from 'chalk';

/**
 获取npm包信息
 @param npmName 当前npm包名
 @returns npm包信息
 */
export const getNpmInfo = async (npmName: string) => {
    const npmUrl = 'https://registry.npmjs.org/' + npmName;
    let res = {};
    try {
        res = await axios.get(npmUrl);
    } catch (err) {
        log.error(err as string);
    }
    return res;
};

/**
 获取npm包最新版本号
 @param npmName 当前npm包名
 @returns npm包最新版本
 */
export const getNpmLatestVersion = async (npmName: string) => {
    const { data } = (await getNpmInfo(npmName)) as AxiosResponse;
    return data['dist-tags'].latest;
};

/**
 * @description 检测 npm 包是否需要更新
 * @param name npm 包名称
 * @param curVersion npm 包当前版本
 */
export const isNeedUpdate = async (name: string, curVersion: string) => {
    const latestVersion = await getNpmLatestVersion(name);
    const need = lodash.gt(latestVersion, curVersion);
    if (need) {
        log.info(
            `检测到 arceus 最新版:${chalk.blueBright(
                latestVersion,
            )} 当前版本:${chalk.blueBright(curVersion)} ~`,
        );
        log.info(
            `可使用 ${chalk.yellow(
                'npm',
            )} install arceus-cli@latest 或 ${chalk.yellow(
                'arceus',
            )} update 更新 ~`,
        );
    }
    return need;
};
