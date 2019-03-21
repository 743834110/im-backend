import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/userLoginLogService/queryById', {
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
export async function queryUserLoginLog(params) {
  return request('/rest/userLoginLogService/queryByPager', {
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
export async function removeUserLoginLog(params) {
  return request('/rest/userLoginLogService/deleteByIds', {
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
export async function addUserLoginLog(params) {
  return request('/rest/userLoginLogService/insert', {
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
export async function updateUserLoginLog(params = {}) {
  return request(`/rest/userLoginLogService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}