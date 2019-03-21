import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/bannerService/queryById', {
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
export async function queryBanner(params) {
  return request('/rest/bannerService/queryByPager', {
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
export async function removeBanner(params) {
  return request('/rest/bannerService/deleteByIds', {
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
export async function addBanner(params) {
  return request('/rest/bannerService/insert', {
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
export async function updateBanner(params = {}) {
  return request(`/rest/bannerService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}