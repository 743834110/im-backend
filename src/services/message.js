import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/messageService/queryById', {
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
export async function queryMessage(params) {
  return request('/rest/messageService/queryByPager', {
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
export async function removeMessage(params) {
  return request('/rest/messageService/deleteByIds', {
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
export async function addMessage(params) {
  return request('/rest/messageService/insert', {
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
export async function updateMessage(params = {}) {
  return request(`/rest/messageService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}