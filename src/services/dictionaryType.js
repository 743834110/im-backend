import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/dictionaryTypeService/queryById', {
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
export async function queryDictionaryType(params) {
  return request('/rest/dictionaryTypeService/queryByPager', {
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
 * 
 * 添加对象
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
 * 更新对象数据
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