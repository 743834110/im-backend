import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/authService/queryById', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

/**
 * 查询用户
 * @param params
 * @return {Promise<*>}
 */
export async function queryAuth(params) {
  return request('/rest/authService/queryByPager', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

/**
 * 删除用户
 * @param params
 * @return {Promise<*>}
 */
export async function removeAuth(params) {
  return request('/rest/authService/deleteByIds', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

/**
 * 添加用户
 * 可能需要进行更新
 * @param params
 * @return {Promise<*>}
 */
export async function addAuth(params) {
  return request('/rest/authService/insert', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 更新用户
 * @param params
 * @return {Promise<*>}
 */
export async function updateAuth(params = {}) {
  return request(`/rest/authService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}