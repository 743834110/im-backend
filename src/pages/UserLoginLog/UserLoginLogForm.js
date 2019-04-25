import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment'
import router from 'umi/router';
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
import SelectEntityModal from "../../components/SelectEntityModal";
import {generateDynamicElement} from "../../utils/utils";
import SelectDictionary from "../Dictionary/SelectDictionary";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _userLoginLog, loading }) => ({
  _userLoginLog,
  submitting: loading.effects['_userLoginLog/add'],
}))
@Form.create()
class UserLoginLogForm extends PureComponent {

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
        type: '_userLoginLog/fetchOne',
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
        type = '_userLoginLog/add';
        break;
      case "update":
        type = '_userLoginLog/update';
        break;
      default:
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
	    // 预处理提交数据:主要是为了处理时间问题
        for (const key in values) {
            if ( values[key] && values[key].format) {
                values[key] = values[key] - 0;
            }
        }
        dispatch({
          type,
          payload: values,
          callback: () => {
            this.setState({
              beanStatus: 'update'
            })
          }
        });
      }
    });
  };

  /**
   * 返回上一页
   */
  handleNavigateBack = () => {
    router.goBack();
  };



  render() {
    const {beanStatus} = this.state;
    let {
      _userLoginLog: {
        object = {}
      }
    } = this.props;
    const {
      submitting,
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
            {
              getFieldDecorator('loginLogId', {
                initialValue: object.loginLogId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='登录账号'>
              {
                getFieldDecorator('userAccount', {
                  initialValue: object.userAccount
                })(<Input placeholder='' />)
              }
            </FormItem>
            {
              getFieldDecorator('sessionId', {
                initialValue: object.sessionId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='退出时间'>
              {
                getFieldDecorator('logoutTime', {
                  initialValue: moment(object.logoutTime)
                })(<DatePicker placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='IP地址'>
              {
                getFieldDecorator('userIp', {
                  initialValue: object.userIp
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='令牌'>
              {
                getFieldDecorator('token', {
                  initialValue: object.token
                })(<Input placeholder='' />)
              }
            </FormItem>
          </Form>
        </Card>
        <FooterToolbar style={{width: '100%'}}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} loading={submitting}>
            <FormattedMessage id="form.submit" />
          </Button>
          <Button htmlType="button" style={{ marginLeft: 8 }} onClick={this.handleNavigateBack}>
            返回
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default UserLoginLogForm;