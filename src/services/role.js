import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/roleService/queryById', {
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
export async function queryRole(params) {
  return request('/rest/roleService/queryByPager', {
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
export async function removeRole(params) {
  return request('/rest/roleService/deleteByIds', {
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
export async function addRole(params) {
  return request('/rest/roleService/insert', {
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
export async function updateRole(params = {}) {
  return request(`/rest/roleService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}