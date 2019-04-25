import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryUserOrg, removeUserOrg, addUserOrg, updateUserOrg, queryById, editUserOrg } from '../services/userOrg';

export default {
  namespace: '_userOrg',

  state: {
    // 列表
    data: {
      list: [],
      pagination: {},
    },
    // 表单
    object: {}
  },

  effects: {
    // 批量提取
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryUserOrg, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    // 提取一项
    *fetchOne({ payload }, { call, put }) {
      const response = yield call(queryById, payload);
      yield put({
        type: 'saveObject',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUserOrg, payload);
      yield put({
        type: 'saveObject',
        payload: response,
      });
      if (response.status >= 200 && response.status < 300) {
        message.success('提交成功');
        if (callback) callback();
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUserOrg, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
      if (response.status >= 200 && response.status < 300) {
        if (callback) callback();
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUserOrg, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
      if (response.status >= 200 && response.status < 300) {
        message.success("完成更新");
        if (callback) callback();
      }
    },
    
    // 暂不将数据更新到state当中，由页面进行数据的刷新
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(editUserOrg, payload);
      if (response.status >= 200 && response.status < 300) {
        message.success("子表完成更新");
        if (callback) callback(response);
      } 
    }
  },


  reducers: {
    saveObject(state, action) {
      return {
        ...state,
        object: action.payload.data
      }
    },
    saveList(state, action) {
      // 此处添加key是用于table内部优化处理
      const list = action.payload.data.result.map(value => ({
        key: value.userOrgId,
        ...value
      }))
      const data = {
        list,
        pagination: {
          current: action.payload.data.offset + 1,
          pageSize: action.payload.data.limit,
          total: action.payload.data.size
        }
      };
      return {
        ...state,
        data
      };
    }
  },
};
