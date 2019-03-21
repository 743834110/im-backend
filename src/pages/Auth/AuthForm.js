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
@connect(({ _auth, loading }) => ({
  _auth,
  submitting: loading.effects['_auth/add'],
}))
@Form.create()
class AuthForm extends PureComponent {

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
        type: '_auth/fetchOne',
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
        type = '_auth/add';
        break;
      case "update":
        type = '_auth/update';
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
      , _auth: {
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
                getFieldDecorator('authId', {
                  initialValue: object.authId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='${column.comment}'>
              {
                getFieldDecorator('authName', {
                  initialValue: object.authName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='权限URL(移动端特指页面)'>
              {
                getFieldDecorator('authUrl', {
                  initialValue: object.authUrl
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('parentId', {
                  initialValue: object.parentId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='权限类型'>
              {
                getFieldDecorator('authType', {
                  initialValue: object.authType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='服务端的API服务权限'>
              {
                getFieldDecorator('apiUrl', {
                  initialValue: object.apiUrl
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='是否为叶子节点'>
              {
                getFieldDecorator('leaf', {
                  initialValue: object.leaf
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='是否可用'>
              {
                getFieldDecorator('available', {
                  initialValue: object.available
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

export default AuthForm;