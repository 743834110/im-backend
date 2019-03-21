import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/userOrgService/queryById', {
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
export async function queryUserOrg(params) {
  return request('/rest/userOrgService/queryByPager', {
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
export async function removeUserOrg(params) {
  return request('/rest/userOrgService/deleteByIds', {
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
export async function addUserOrg(params) {
  return request('/rest/userOrgService/insert', {
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
export async function updateUserOrg(params = {}) {
  return request(`/rest/userOrgService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}