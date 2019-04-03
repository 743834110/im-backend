import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from '../../style.less';
import {generateDynamicElement} from "../../utils/utils";
import SelectEntityModal from "../../components/SelectEntityModal";
import SelectOrganization from "../Organization/SelectOrganization";

class UserOrgTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      // 本组件
      data: [],
      loading: false,
      params: props.params,
    };

    // 作用域绑定：用户父组件调用组件的保存内容方法
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
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

  newUserOrg = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      userId: '',
      orgId: '',
      userName: '',
      roleId: '',
      parentOrgId: '',
      orgType: '',
      grade: '',
      orgName: '',
      userImageUrl: '',
      shortName: '',
      editable: true,
      isNew: true,
      beanStatus: "insert"
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    newData.push({
      key,
      userOrgId: key,
      beanStatus: 'delete'
      ,
    });
    this.setState({ data: newData });
    onChange(newData);
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
      !target.userId ||
      !target.orgId ||
      !target.userName ||
      !target.roleId ||
      !target.parentOrgId ||
      !target.orgType ||
      !target.grade ||
      !target.orgName ||
      !target.userImageUrl ||
      !target.shortName      ) {
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
      const { onChange } = this.props;
      onChange(data);
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
   * 处理用户类型点击事件
   */
  handleOrgClick = () => {
    let modal;
    const { data } = this.state;
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
        <SelectOrganization />
      </SelectEntityModal>
    );
  };

  render() {
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'userName',
        key: 'userName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'userName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="用户名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '组织类型',
        dataIndex: 'orgType',
        key: 'orgType',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'orgType', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织类型"
              />
            );
          }
          return text;
        },
      },
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'grade', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="年级（在org_type为class类型是不能为空）"
              />
            );
          }
          return text;
        },
      },
      {
        title: '组织名称',
        dataIndex: 'orgName',
        key: 'orgName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'orgName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '组织简称',
        dataIndex: 'shortName',
        key: 'shortName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'shortName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织简称"
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
          <Button icon="plus" type="primary" onClick={this.handleOrgClick}>
            选择组织
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
          onClick={this.newUserOrg}
          icon="plus"
        >
          新增
        </Button>
      </Fragment>
    );
  }
}

export default UserOrgTableForm;
