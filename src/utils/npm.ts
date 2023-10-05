import axios, { AxiosResponse } from "axios";
import log from "./log";

/**
 获取npm包信息
 @param npmName 当前npm包名
 @returns
 */
export const getNpmInfo = async (npmName: string) => {
    const npmUrl = 'https://registry.npmjs.org/' + npmName
    let res
    try {
        res = await axios.get(npmUrl)
    } catch (err) {
        log.error(err as string)
    }
    return res
}

/**
 获取npm包最新版本号
 @param npmName 当前npm包名
 @returns
 */
export const getNpmLatestVersion = async (npmName: string) => {
    const { data } = (await getNpmInfo(npmName)) as AxiosResponse
    return data['dist-tags'].latest
}


export const isNeedUpdate = async (name: string, version: string) => {

}
