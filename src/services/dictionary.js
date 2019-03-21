import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/dictionaryService/queryById', {
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
export async function queryDictionary(params) {
  return request('/rest/dictionaryService/queryByPager', {
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
export async function removeDictionary(params) {
  return request('/rest/dictionaryService/deleteByIds', {
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
export async function addDictionary(params) {
  return request('/rest/dictionaryService/insert', {
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
export async function updateDictionary(params = {}) {
  return request(`/rest/dictionaryService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}