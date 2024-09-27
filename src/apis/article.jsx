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

/**
 * 删除文章
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteArticle = (id) =>{
    return request({
        method: "DELETE",
        url: `/mp/articles/${id}`
    })
}

/**
 * 发布文章
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishArticle = (params, draft = false) =>{
    return request({
        method: "POST",
        url: '/mp/articles?draft=' + draft,
        data: params
    })
}

/**
 * 获取文章
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getArticleById(id) {
    return request({
        method: "GET",
        url: `/mp/articles/${id}`
    })
}

/**
 * 更新文章
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateArticle(data, draft = false) {
    return request({
        method: 'PUT',
        url: `/mp/articles/${data.id}?draft=` + draft,
        data
    })
}
