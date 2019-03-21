import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/chatGroupService/queryById', {
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
export async function queryChatGroup(params) {
  return request('/rest/chatGroupService/queryByPager', {
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
export async function removeChatGroup(params) {
  return request('/rest/chatGroupService/deleteByIds', {
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
export async function addChatGroup(params) {
  return request('/rest/chatGroupService/insert', {
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
export async function updateChatGroup(params = {}) {
  return request(`/rest/chatGroupService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}