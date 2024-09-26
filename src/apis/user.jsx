import {request} from "@/utils/request";

/**
 * 登录请求，用于用户登录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (params) =>{
    return request({
        method: 'POST',
        url: '/authorizations',
        data: params
    })
}

/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserInfo = ()=>{
    return request({
        method: 'GET',
        url: '/user/profile'
    })
}
