import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/userOrgRoleService/queryById', {
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
export async function queryUserOrgRole(params) {
  return request('/rest/userOrgRoleService/queryByPager', {
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
export async function removeUserOrgRole(params) {
  return request('/rest/userOrgRoleService/deleteByIds', {
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
export async function addUserOrgRole(params) {
  return request('/rest/userOrgRoleService/insert', {
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
export async function updateUserOrgRole(params = {}) {
  return request(`/rest/userOrgRoleService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}