import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/collectService/queryById', {
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
export async function queryCollect(params) {
  return request('/rest/collectService/queryByPager', {
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
export async function removeCollect(params) {
  return request('/rest/collectService/deleteByIds', {
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
export async function addCollect(params) {
  return request('/rest/collectService/insert', {
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
export async function updateCollect(params = {}) {
  return request(`/rest/collectService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}