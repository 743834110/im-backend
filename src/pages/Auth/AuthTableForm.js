import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import { connect } from 'dva';
import PropTypes from 'prop-types'
import styles from '../../style.less';
import {generateDynamicElement} from "../../utils/utils";
import SelectEntityModal from "../../components/SelectEntityModal";
import SelectAuth from "./SelectAuth";
import SelectOrganization from "../Organization/SelectOrganization";

@connect(({ _auth, loading }) => {
  return {
    _auth,
    loading: loading.models._auth,
  };
})
class AuthTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};
  
  refreshData = false;

  constructor(props) {
    super(props);

    this.state = {
      // 本组件
      data: [],
      loading: false,
    };
    props.triggerRef(this)
  }

  // 接收主表传递过来的参数，用参数名param接收
  // 进而影响子表查询
  componentDidMount() {
    const {param, dispatch} = this.props;
    if (JSON.stringify(param) === '{}') {
      return;
    }

    dispatch({
      type: '_auth/fetch',
      payload: {
        pager: {
          param
        }
      }
    });
    this.setState({
      loading: true,
    })
    this.refreshData = true;
  }

  componentWillReceiveProps(nextProps) {
    let auths = null;
    const {data} = this.state;
    if (this.refreshData && nextProps._auth.data.list.length !== 0) {
      this.refreshData = false;
      auths = [...nextProps._userOrg.data.list];
      setTimeout(() => {
        this.setState({
          data: auths,
          loading: false
        });
      }, 500)
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  /**
   * 处理基本参数，
   * 准备进行参数提交的处理
   */
  handleSubmit = () => {
    const {data} = this.state;
    const {dispatch, param} = this.props;
    const insert = [];
    const update = [];
    const cut = [];
    data.forEach(item => {
      switch (item.beanStatus) {
        case 'insert':
          insert.push(item);
          break;
        case 'update':
          update.push(item);
          break;
        case 'delete':
          cut.push(item);
          break;
        default:
      }
    })
    this.setState({
      loading: true
    });
    dispatch({
      type: '_auth/edit',
      payload: {
        inputBean: {
          insert,
          delete: cut,
          update
        }
      },
      callback: () => {
        dispatch({
          type: '_auth/fetch',
          payload: {
            pager: {
              param
            }
          }
        });
        this.refreshData = true;
      }
    })
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      // 取消编辑状态时查看异同,主要是为了减少提交量
      // 新建状态的在提交至服务器时永远时新建状态，
      // 有变更的为更新状态
      else {
        const temp = {...target};
        delete  temp.editable;
        if (this.cacheOriginData[key] && this.cacheOriginData[key].editable != null) {
          delete  this.cacheOriginData[key].editable;
        }
        if (!isEqual(this.cacheOriginData[key], temp)) {
          if (target.beanStatus !== 'insert') {
            target.beanStatus = "update"
          }
        }
    }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newAuth = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      authName: '',
      authUrl: '',
      parentId: '',
      authType: '',
      apiUrl: '',
      leaf: '',
      available: '',
      editable: true,
      isNew: true,
      beanStatus: "insert"
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const newData = data.filter(item => item.key !== key);
    newData.push({
      key,
      authId: key,
      beanStatus: 'delete'
      ,
    });
    this.setState({ data: newData });
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (
      !target.authName ||
      !target.authUrl ||
      !target.parentId ||
      !target.authType ||
      !target.apiUrl ||
      !target.leaf ||
      !target.available      ) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  /**
   * 选择系统资源
   */
  handleSelectAuth = () => {
    let modal;
    const { data } = this.state;
    const {param} = this.props
    const newData = data.map(item => ({ ...item }));
    this.index += 1;
    this.setState({ data: newData });
    /**
     * 数据回调，设置值
     */
    const handleModalOk = (res) => {
      modal.destory();
      if (!res || res.constructor !== Array || res.length === 0) {
        return;
      }
      res.forEach(item => {
        newData.push({
          key: `NEW_TEMP_ID_${this.index}`,
          ...item,
          ...param,
          beanStatus: 'insert'
        })
      });
      this.index += 1;
      this.setState({
        data: newData,
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          loading: false
        })
      })
    };
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk}>
        <SelectAuth />
      </SelectEntityModal>
    );
  };

  render() {
    const columns = [
      {
        title: '资源名称',
        dataIndex: 'authName',
        key: 'authName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'authName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="资源名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '权限URL(移动端特指页面)',
        dataIndex: 'authUrl',
        key: 'authUrl',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'authUrl', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="权限URL(移动端特指页面)"
              />
            );
          }
          return text;
        },
      },
      {
        title: '权限类型',
        dataIndex: 'authType',
        key: 'authType',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'authType', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="权限类型"
              />
            );
          }
          return text;
        },
      },
      {
        title: '服务端的API服务权限',
        dataIndex: 'apiUrl',
        key: 'apiUrl',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'apiUrl', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="服务端的API服务权限"
              />
            );
          }
          return text;
        },
      },
      {
        title: '是否为叶子节点',
        dataIndex: 'leaf',
        key: 'leaf',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'leaf', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="是否为叶子节点"
              />
            );
          }
          return text;
        },
      },
      {
        title: '是否可用',
        dataIndex: 'available',
        key: 'available',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'available', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="是否可用"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={this.handleSelectAuth}>
            选择系统资源
          </Button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data.filter(item => item.beanStatus !== 'delete')}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newAuth}
          icon="plus"
        >
          新增
        </Button>
      </Fragment>
    );
  }
}

AuthTableForm.defaultProps = {
  param: {},
  triggerRef: () => {}
};

AuthTableForm.propTypes = {
  param: PropTypes.object,
  triggerRef: PropTypes.func
};

export default AuthTableForm;
