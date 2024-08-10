// @ts-ignore
/* eslint-disable */
import request from '@/plugins/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
    return request<API.BaseResponse<API.CurrentUser>>('/api/user/currentUser', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    return request<API.BaseResponse<boolean>>('/api/user/logout', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/rule', {
        method: 'POST',
        data: {
            method: 'delete',
            ...(options || {}),
        }
    });
}

/**
 * 根据条件查找用户
 */

export async function searchUser(options?: { [key: string]: any }) {
    return request<API.BaseResponse<Array<API.CurrentUser>>>('/api/user/search', {
        method: 'GET',
        params: {
            ...options
        }
    });
}
