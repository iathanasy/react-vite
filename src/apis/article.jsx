import {request} from "@/utils/request";

/**
 * 获取频道列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getChannels = ()=>{
    return request({
        method: 'GET',
        url: '/channels'
    })
}

/**
 * 获取文章列表
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getArticleList = (params)=>{
    return request({
        method: 'GET',
        url: '/mp/articles',
        params
    })
}
