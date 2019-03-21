import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/organizationService/queryById', {
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
export async function queryOrganization(params) {
  return request('/rest/organizationService/queryByPager', {
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
export async function removeOrganization(params) {
  return request('/rest/organizationService/deleteByIds', {
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
export async function addOrganization(params) {
  return request('/rest/organizationService/insert', {
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
export async function updateOrganization(params = {}) {
  return request(`/rest/organizationService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}