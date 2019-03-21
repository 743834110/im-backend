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
@connect(({ _routine, loading }) => ({
  _routine,
  submitting: loading.effects['_routine/add'],
}))
@Form.create()
class RoutineForm extends PureComponent {

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
        type: '_routine/fetchOne',
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
        type = '_routine/add';
        break;
      case "update":
        type = '_routine/update';
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
      , _routine: {
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
                getFieldDecorator('routineId', {
                  initialValue: object.routineId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem>
              {
                getFieldDecorator('userId', {
                  initialValue: object.userId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='用户名称'>
              {
                getFieldDecorator('userName', {
                  initialValue: object.userName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='日常活动类型'>
              {
                getFieldDecorator('routineType', {
                  initialValue: object.routineType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='日常活动内容'>
              {
                getFieldDecorator('content', {
                  initialValue: object.content
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
            <FormItem {...formItemLayout} label='用户类型'>
              {
                getFieldDecorator('userType', {
                  initialValue: object.userType
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('orgId', {
                  initialValue: object.orgId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='活动截止日期'>
              {
                getFieldDecorator('endTime', {
                  initialValue: object.endTime
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='活动是否截止'>
              {
                getFieldDecorator('end', {
                  initialValue: object.end
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='可见年级'>
              {
                getFieldDecorator('grade', {
                  initialValue: object.grade
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='可见范围'>
              {
                getFieldDecorator('visibility', {
                  initialValue: object.visibility
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='日常活动标题'>
              {
                getFieldDecorator('title', {
                  initialValue: object.title
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

export default RoutineForm;