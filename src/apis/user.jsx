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