import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// 日期处理类库
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Divider
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from '../../TableList.less';


const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const sexMap = {
  "M": '男',
  "W": '女'
};


/* eslint react/no-multi-comp:0 */
@connect(({ _dictionary, loading }) => {
  return {
    _dictionary,
    loading: loading.models._dictionary,
  };
})

// 需要动态生成。
@Form.create()
class DictionaryList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    /**
     * 此处需要动态生成
     * 某些字段的
     * needTotal, sorter, filter
     * render函数返回组件或html或字符串(不写render也默认返回字符串)
     * @type {*[]}
     */
    columns: [
      {
        title: '分类编号',
        dataIndex: 'codeItemId'
      },
      {
        title: '具体分类名称',
        dataIndex: 'codeId'
      },
      {
        title: '具体分类名称',
        dataIndex: 'codeName'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '创建人ID',
        dataIndex: 'createPerson'
      },
      {
        title: '修改时间',
        dataIndex: 'modifyTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '修改人ID',
        dataIndex: 'modifyPerson'
      },
      {
        title: '操作',
        render: (record) => {
          return (
            <Fragment>
              <a onClick={() => this.previewItem(record.dictionaryId)}>配置</a>
            </Fragment>
          )
        },
      },
    ]
  };


  /**
   * 需要动态生成。
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: '_dictionary/fetch',
    });
  }

  /**
   * 列标题、分页点击事件
   * @param pagination
   * @param filtersArg
   * @param sorter
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pager: {
        offset: pagination.current - 1,
        limit: pagination.pageSize,
        param: {
          ...formValues,
          ...filters,
        }
      }
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    // 动态生成
    dispatch({
      type: '_dictionary/fetch',
      payload: params,
    });
  };

  /**
   * 预览某一个项目，
   * 跳入下一页页面
   * 需要动态生成
   * @param id
   */
  previewItem = id => {
    router.push(`/dictionary/dictionaryForm/${id}`);
  };
  newItem = () => {
    router.push(`/dictionary/dictionaryForm`);
  };




  /**
   * 搜索表单重置
   * 需要动态生成
   */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: '_dictionary/fetch',
      payload: {},
    });
  };

  /**
   * 点击展开更多搜索表单
   */
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  /**
   * 菜单点击事件：有如delete
   * @param e
   */
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: '_dictionary/remove',
          payload: {
            dictionaryIds: selectedRows.map(row => row.dictionaryId).join(','),
          },
          callback: () => {
            dispatch({
              type: '_dictionary/fetch',
              payload: {},
            });
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  /**
   * 选中当前行事件
   * @param rows
   */
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /**
   * 点击搜索目标数据事件
   * @param e
   */
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      console.log(values);

      dispatch({
        type: '_dictionary/fetch',
        payload: {
          pager: {
            param: values
          }
        },
      });
    });
  };


  // 一系列查找列表。
  // 栅格系统占宽代号: xs, sm, md lg, xl
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="分类类别">
              {getFieldDecorator('codeItemId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>          
          <Col md={8} sm={24}>
            <FormItem label="具体分类ID">
              {getFieldDecorator('codeId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>          
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 多展开表单
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="分类类别">
              {getFieldDecorator('codeItemId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="具体分类ID">
              {getFieldDecorator('codeId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="具体分类名称">
              {getFieldDecorator('codeName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createTime')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="创建人ID">
              {getFieldDecorator('createPerson')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="修改时间">
              {getFieldDecorator('modifyTime')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="修改人ID">
              {getFieldDecorator('modifyPerson')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="父级节点">
              {getFieldDecorator('parentCodeId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    // 需要动态生成。
    const {
      _dictionary: { data = {} },
      loading,
    } = this.props;
    const {selectedRows, columns} = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.newItem()}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DictionaryList;
