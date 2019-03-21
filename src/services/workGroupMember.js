import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/workGroupMemberService/queryById', {
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
export async function queryWorkGroupMember(params) {
  return request('/rest/workGroupMemberService/queryByPager', {
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
 * 添加用户
 * 可能需要进行更新
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
 * 更新用户
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