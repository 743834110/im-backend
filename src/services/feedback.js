import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/feedbackService/queryById', {
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
export async function queryFeedback(params) {
  return request('/rest/feedbackService/queryByPager', {
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
export async function removeFeedback(params) {
  return request('/rest/feedbackService/deleteByIds', {
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
export async function addFeedback(params) {
  return request('/rest/feedbackService/insert', {
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
export async function updateFeedback(params = {}) {
  return request(`/rest/feedbackService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}