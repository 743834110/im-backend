import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from '../../formStyle.less';
import FooterToolbar from "../../components/FooterToolbar";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _role, loading }) => ({
  _role,
  submitting: loading.effects['_role/add'],
}))
@Form.create()
class RoleForm extends PureComponent {

  // 实体状态
  state = {
    beanStatus: 'add'
  };

  /**
   * 获取其他页面传输过来的参数
   * 需要动态生成。
   */
  componentDidMount() {
    const {match: {params}} = this.props;
    if (JSON.stringify(params) !== '{}') {
      this.setState({
        beanStatus: 'update'
      });
      const { dispatch } = this.props;
      dispatch({
        type: '_role/fetchOne',
        payload: params
      });
    }
  }


  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const {beanStatus} = this.state;
    e.preventDefault();
    let type;
    switch (beanStatus) {
      case "add":
        type = '_role/add';
        break;
      case "update":
        type = '_role/update';
        break;
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type,
          payload: values,
          callback(transaction) {

          }
        });
      }
    });
  };



  render() {
    let {beanStatus} = this.state;
    let {
      submitting
      , _role: {
        object = {}
      }
    } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    if (beanStatus === 'add') {
      object = {};
    }

    // 需要动态生成
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem>
              {
                getFieldDecorator('roleId', {
                  initialValue: object.roleId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='角色名称'>
              {
                getFieldDecorator('roleName', {
                  initialValue: object.roleName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色描述'>
              {
                getFieldDecorator('roleDescription', {
                  initialValue: object.roleDescription
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色类型'>
              {
                getFieldDecorator('roleType', {
                  initialValue: object.roleType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色数量'>
              {
                getFieldDecorator('roleNumber', {
                  initialValue: object.roleNumber
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('userId', {
                  initialValue: object.userId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem>
              {
                getFieldDecorator('orgId', {
                  initialValue: object.orgId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='角色所属平台：backend | app'>
              {
                getFieldDecorator('platform', {
                  initialValue: object.platform
                })(<Input placeholder='' />)
              }
            </FormItem>
          </Form>
        </Card>
        <FooterToolbar style={{width: '100%'}}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} loading={submitting}>
            <FormattedMessage id="form.submit" />
          </Button>
          <Button style={{ marginLeft: 8 }}>
            <FormattedMessage id="form.save" />
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default RoleForm;