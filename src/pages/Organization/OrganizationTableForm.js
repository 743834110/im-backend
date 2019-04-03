import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from '../../style.less';

class OrganizationTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
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

  newOrganization = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      parentId: '',
      orgType: '',
      proType: '',
      orgDescription: '',
      orgName: '',
      orgImageUrl: '',
      orgAnnounce: '',
      valid: '',
      userId: '',
      createTime: '',
      grade: '',
      shortName: '',
      associateType: '',
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
      orgId: key,
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
      !target.parentId ||
      !target.orgType ||
      !target.proType ||
      !target.orgDescription ||
      !target.orgName ||
      !target.orgImageUrl ||
      !target.orgAnnounce ||
      !target.valid ||
      !target.userId ||
      !target.createTime ||
      !target.grade ||
      !target.shortName ||
      !target.associateType
      ) {
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

  render() {
    const columns = [
      {
        title: '父级节点ID',
        dataIndex: 'parentId',
        key: 'parentId',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'parentId', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="父级节点ID"
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
        title: '专业类型',
        dataIndex: 'proType',
        key: 'proType',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'proType', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="专业类型"
              />
            );
          }
          return text;
        },
      },
      {
        title: '组织描述',
        dataIndex: 'orgDescription',
        key: 'orgDescription',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'orgDescription', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织描述"
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
        title: '组织头像地址',
        dataIndex: 'orgImageUrl',
        key: 'orgImageUrl',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'orgImageUrl', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织头像地址"
              />
            );
          }
          return text;
        },
      },
      {
        title: '组织公告',
        dataIndex: 'orgAnnounce',
        key: 'orgAnnounce',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'orgAnnounce', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="组织公告"
              />
            );
          }
          return text;
        },
      },
      {
        title: '是否有效',
        dataIndex: 'valid',
        key: 'valid',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'valid', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="是否有效"
              />
            );
          }
          return text;
        },
      },
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'userId', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="用户ID"
              />
            );
          }
          return text;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'createTime', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="创建时间"
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
                placeholder="年级"
              />
            );
          }
          return text;
        },
      },
      {
        title: '${column.comment}',
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
                placeholder="${column.comment}"
              />
            );
          }
          return text;
        },
      },
      {
        title: '${column.comment}',
        dataIndex: 'associateType',
        key: 'associateType',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'associateType', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="${column.comment}"
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
         {/*
           <Button icon="plus" type="primary" onClick={() => this.newItem()}>
            选择XX
          </Button> 
        */}
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
          onClick={this.newOrganization}
          icon="plus"
        >
          新增
        </Button>
      </Fragment>
    );
  }
}

export default OrganizationTableForm;
