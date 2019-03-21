import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/roleAuthService/queryById', {
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
export async function queryRoleAuth(params) {
  return request('/rest/roleAuthService/queryByPager', {
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
export async function removeRoleAuth(params) {
  return request('/rest/roleAuthService/deleteByIds', {
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
export async function addRoleAuth(params) {
  return request('/rest/roleAuthService/insert', {
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
export async function updateRoleAuth(params = {}) {
  return request(`/rest/roleAuthService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}