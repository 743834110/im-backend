import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/dictionaryService/queryById', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

/**
 * 通过分页对象查询
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
 * 通过ID数组进行对象的删除
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
 * 
 * 添加对象
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
 * 更新对象数据
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