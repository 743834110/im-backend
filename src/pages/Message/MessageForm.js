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
@connect(({ _message, loading }) => ({
  _message,
  submitting: loading.effects['_message/add'],
}))
@Form.create()
class MessageForm extends PureComponent {

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
        type: '_message/fetchOne',
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
        type = '_message/add';
        break;
      case "update":
        type = '_message/update';
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
      , _message: {
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
            <FormItem {...formItemLayout} label='消息ID'>
              {
                getFieldDecorator('id', {
                  initialValue: object.id
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='发送者ID'>
              {
                getFieldDecorator('from', {
                  initialValue: object.from
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='目标ID'>
              {
                getFieldDecorator('to', {
                  initialValue: object.to
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='命令码类型'>
              {
                getFieldDecorator('cmd', {
                  initialValue: object.cmd
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
            <FormItem {...formItemLayout} label='聊天类型'>
              {
                getFieldDecorator('chatType', {
                  initialValue: object.chatType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('groupId', {
                  initialValue: object.groupId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='内容'>
              {
                getFieldDecorator('content', {
                  initialValue: object.content
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='撤回'>
              {
                getFieldDecorator('recall', {
                  initialValue: object.recall
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('userIds', {
                  initialValue: object.userIds
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='发送者名称'>
              {
                getFieldDecorator('fromName', {
                  initialValue: object.fromName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='${column.comment}'>
              {
                getFieldDecorator('groupName', {
                  initialValue: object.groupName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='${column.comment}'>
              {
                getFieldDecorator('fromAvatar', {
                  initialValue: object.fromAvatar
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='${column.comment}'>
              {
                getFieldDecorator('groupAvatar', {
                  initialValue: object.groupAvatar
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

export default MessageForm;