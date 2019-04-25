import { stringify } from 'qs';
import request from '../utils/request';

export async function queryById(params) {
  return request('/rest/fileService/queryById', {
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
export async function queryFile(params) {
  return request('/rest/fileService/queryByPager', {
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
export async function removeFile(params) {
  return request('/rest/fileService/deleteByIds', {
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
export async function addFile(params) {
  return request('/rest/fileService/insert', {
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
export async function updateFile(params = {}) {
  return request(`/rest/fileService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * 文件上传
 * @param params
 * @returns {Promise<void>}
 */
export async function uploadFile(params) {
  return request(`/rest/fileService/upload`, {
    method: 'POST',
    body: params,
  });
}
