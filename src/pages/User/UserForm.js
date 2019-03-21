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
@connect(({ _user, loading }) => ({
  _user,
  submitting: loading.effects['_user/add'],
}))
@Form.create()
class UserForm extends PureComponent {

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
        type: '_user/fetchOne',
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
        type = '_user/add';
        break;
      case "update":
        type = '_user/update';
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
      , _user: {
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
                getFieldDecorator('userId', {
                  initialValue: object.userId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='用户账号'>
              {
                getFieldDecorator('userAccount', {
                  initialValue: object.userAccount
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户密码'>
              {
                getFieldDecorator('userPassword', {
                  initialValue: object.userPassword
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户名称'>
              {
                getFieldDecorator('userName', {
                  initialValue: object.userName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='手机号'>
              {
                getFieldDecorator('userMobile', {
                  initialValue: object.userMobile
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='QQ邮箱'>
              {
                getFieldDecorator('userEmail', {
                  initialValue: object.userEmail
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户头像地址'>
              {
                getFieldDecorator('userImageUrl', {
                  initialValue: object.userImageUrl
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户描述'>
              {
                getFieldDecorator('userDescription', {
                  initialValue: object.userDescription
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='初始密码更改日期'>
              {
                getFieldDecorator('userPasswordChanged', {
                  initialValue: object.userPasswordChanged
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='是否有效'>
              {
                getFieldDecorator('valid', {
                  initialValue: object.valid
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='启用日期'>
              {
                getFieldDecorator('userEnabledDate', {
                  initialValue: object.userEnabledDate
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='失效日期'>
              {
                getFieldDecorator('userDisabledDate', {
                  initialValue: object.userDisabledDate
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='账号是否锁定'>
              {
                getFieldDecorator('userAccountLocked', {
                  initialValue: object.userAccountLocked
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='最后登录时间'>
              {
                getFieldDecorator('lastLoginDate', {
                  initialValue: object.lastLoginDate
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='创建时间'>
              {
                getFieldDecorator('createTime', {
                  initialValue: object.createTime
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='创建人'>
              {
                getFieldDecorator('createPerson', {
                  initialValue: object.createPerson
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='修改时间'>
              {
                getFieldDecorator('modifyTime', {
                  initialValue: object.modifyTime
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='修改人'>
              {
                getFieldDecorator('modifyPerson', {
                  initialValue: object.modifyPerson
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户性别'>
              {
                getFieldDecorator('userSex', {
                  initialValue: object.userSex
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户类型'>
              {
                getFieldDecorator('userType', {
                  initialValue: object.userType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='盐值'>
              {
                getFieldDecorator('salt', {
                  initialValue: object.salt
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='留言'>
              {
                getFieldDecorator('words', {
                  initialValue: object.words
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='校园短号'>
              {
                getFieldDecorator('userShortMobile', {
                  initialValue: object.userShortMobile
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('roleId', {
                  initialValue: object.roleId
                })(<Input type='hidden' placeholder='' />)
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

export default UserForm;