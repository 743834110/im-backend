import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/userOrgService/queryById', {
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
export async function queryUserOrg(params) {
  return request('/rest/userOrgService/queryByPager', {
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
export async function removeUserOrg(params) {
  return request('/rest/userOrgService/deleteByIds', {
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
export async function addUserOrg(params) {
  return request('/rest/userOrgService/insert', {
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
export async function updateUserOrg(params = {}) {
  return request(`/rest/userOrgService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * 编辑userOrg，通常出现在对字表的编辑中
 * @param params
 * @return {Promise<Object>}
 */
export async function editUserOrg(params = {}) {
  return request(`/rest/adminUserOrgService/editByInputBean`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
