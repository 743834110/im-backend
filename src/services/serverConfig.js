import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/serverConfigService/queryById', {
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
export async function queryServerConfig(params) {
  return request('/rest/serverConfigService/queryByPager', {
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
export async function removeServerConfig(params) {
  return request('/rest/serverConfigService/deleteByIds', {
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
export async function addServerConfig(params) {
  return request('/rest/serverConfigService/insert', {
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
export async function updateServerConfig(params = {}) {
  return request(`/rest/serverConfigService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}