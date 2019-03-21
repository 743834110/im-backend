import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/discussionService/queryById', {
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
export async function queryDiscussion(params) {
  return request('/rest/discussionService/queryByPager', {
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
export async function removeDiscussion(params) {
  return request('/rest/discussionService/deleteByIds', {
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
export async function addDiscussion(params) {
  return request('/rest/discussionService/insert', {
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
export async function updateDiscussion(params = {}) {
  return request(`/rest/discussionService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}