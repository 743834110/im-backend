import { message } from 'antd';
import { queryDictionaryType, removeDictionaryType, addDictionaryType, updateDictionaryType, queryById } from '@/services/dictionaryType';

export default {
  namespace: '_dictionaryType',

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
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDictionaryType, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
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
      const response = yield call(addDictionaryType, payload);
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
      const response = yield call(removeDictionaryType, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
      if (response.status >= 200 && response.status < 300) {
        if (callback) callback();
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDictionaryType, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
      if (response.status >= 200 && response.status < 300) {
        message.success("完成更新");
        if (callback) callback();
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
        key: value.codeItemId,
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
