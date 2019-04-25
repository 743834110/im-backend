import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/authService/queryById', {
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
export async function queryAuth(params) {
  return request('/rest/authService/queryByPager', {
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
export async function removeAuth(params) {
  return request('/rest/authService/deleteByIds', {
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
export async function addAuth(params) {
  return request('/rest/authService/insert', {
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
export async function updateAuth(params = {}) {
  return request(`/rest/authService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * 编辑auth，通常出现在对字表的编辑中
 * @param params
 * @return {Promise<Object>}
 */
export async function editAuth(params = {}) {
  return request(`/rest/authService/editByInputBean`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}