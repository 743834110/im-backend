import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/routineService/queryById', {
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
export async function queryRoutine(params) {
  return request('/rest/routineService/queryByPager', {
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
export async function removeRoutine(params) {
  return request('/rest/routineService/deleteByIds', {
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
export async function addRoutine(params) {
  return request('/rest/routineService/insert', {
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
export async function updateRoutine(params = {}) {
  return request(`/rest/routineService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}