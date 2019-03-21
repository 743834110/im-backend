import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/dictionaryTypeService/queryById', {
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
export async function queryDictionaryType(params) {
  return request('/rest/dictionaryTypeService/queryByPager', {
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
export async function removeDictionaryType(params) {
  return request('/rest/dictionaryTypeService/deleteByIds', {
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
export async function addDictionaryType(params) {
  return request('/rest/dictionaryTypeService/insert', {
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
export async function updateDictionaryType(params = {}) {
  return request(`/rest/dictionaryTypeService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}