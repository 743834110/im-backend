import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/workGroupMemberService/queryById', {
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
export async function queryWorkGroupMember(params) {
  return request('/rest/workGroupMemberService/queryByPager', {
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
export async function removeWorkGroupMember(params) {
  return request('/rest/workGroupMemberService/deleteByIds', {
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
export async function addWorkGroupMember(params) {
  return request('/rest/workGroupMemberService/insert', {
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
export async function updateWorkGroupMember(params = {}) {
  return request(`/rest/workGroupMemberService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}