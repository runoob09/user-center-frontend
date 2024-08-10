/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";

/**
 * 异常处理程序
 */


/**
 * 配置request请求时的默认参数
 */
const request = extend({
    credentials: 'include', // 默认请求是否带上cookie
    // requestType: 'form',
});


/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
    const data: API.BaseResponse<any> = await response.clone().json();
    if (data.code === 0) {
        message.success(`状态码:${data.code},${data.description}`);
        return response.clone().json(); // 请求成功则直接返回结果
    }
    message.error(`状态码:${data.code},${data.description}`);
    return null;
});

export default request;
