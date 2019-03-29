import React, { PureComponent } from 'react';
import { connect } from 'dva';
// 日期处理类库
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
} from 'antd';
import StandardTable from '../../components/StandardTable';
import styles from '../../TableList.less';


const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ _dictionaryType, loading }) => {
  return {
    _dictionaryType,
    loading: loading.models._dictionaryType,
  };
})

// 需要动态生成。
@Form.create()
class SelectDictionaryType extends PureComponent {
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
        title: '分类名称',
        dataIndex: 'codeItemName'
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
        title: '修改人ID',
        dataIndex: 'modifyPerson'
      },
          {
        title: '修改时间',
        dataIndex: 'modifyTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
    ]
  };


  /**
   * 需要动态生成。
   * 提交查询参数，更新显示查询字段域值
   */
  componentDidMount() {
    const { dispatch, param, form: {setFieldsValue} } = this.props;
    dispatch({
      type: '_dictionaryType/fetch',
      payload: {
        pager: {
          param
        }
      }
    });
    setFieldsValue(param);
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
      const object = {};
      object[sorter.field] = sorter.order;
      params.pager.sorter = [object];
    }

    // 动态生成
    dispatch({
      type: '_dictionaryType/fetch',
      payload: params,
    });
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
      type: '_dictionaryType/fetch',
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
   * 选中当前行事件
   * @param rows
   */
  handleSelectRows = rows => {
    const {handleSelectRows} = this.props;
    this.setState({
      selectedRows: rows,
    });
    if (handleSelectRows) {
      handleSelectRows(rows);
    }
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

      dispatch({
        type: '_dictionaryType/fetch',
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
            <FormItem label="分类编号">
              {getFieldDecorator('codeItemId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>          
          <Col md={8} sm={24}>
            <FormItem label="分类名称">
              {getFieldDecorator('codeItemName')(<Input placeholder="请输入" />)}
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
            <FormItem label="分类编号">
              {getFieldDecorator('codeItemId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="分类名称">
              {getFieldDecorator('codeItemName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
          <Col md={8} sm={24}>
            <FormItem label="父节点编号">
              {getFieldDecorator('parentId')(<Input placeholder="请输入" />)}
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
            <FormItem label="修改人ID">
              {getFieldDecorator('modifyPerson')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>       
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="修改时间">
              {getFieldDecorator('modifyTime')(<Input placeholder="请输入" />)}
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
      _dictionaryType: { data = {} },
      loading,
    } = this.props;
    const {selectedRows, columns} = this.state;

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.newItem()}>
              新建
            </Button>
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
    );
  }
}

export default SelectDictionaryType;
