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
import {generateDynamicElement} from "../../utils/utils";
import SelectEntityModal from "../../components/SelectEntityModal";
import SelectDictionary from "../Dictionary/SelectDictionary";

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
	    // 预处理提交数据:主要是为了处理时间问题
        for (const key in values) {
            if ( values[key] && values[key].format) {
                values[key] = values[key] - 0;
            }
        }
        dispatch({
          type,
          payload: values,
          callback(transaction) {

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

  /**
   * 处理日常活动类型点击事件
   */
  handleRoutineTypeClick = () => {
    let modal;
    /**
     * 数据回调，设置表单的值
     */
    const {form: {setFieldsValue, getFieldValue}} = this.props;
    const handleModalOk = (res) => {
      modal.destory();
      if (!res || res.constructor !== Array || res.length === 0) {
        return;
      }
      setFieldsValue({
        'routineType': res[0].codeId
      });
    };
    const codeId = getFieldValue('routineType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'ROUTINE', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };

  /**
   * 处理可见范围点击事件
   */
  handleVisibilityClick = () => {
    let modal;
    /**
     * 数据回调，设置表单的值
     */
    const {form: {setFieldsValue, getFieldValue}} = this.props;
    const handleModalOk = (res) => {
      modal.destory();
      if (!res || res.constructor !== Array || res.length === 0) {
        return;
      }
      setFieldsValue({
        'visibility': res[0].codeId
      });
    };
    const codeId = getFieldValue('visibility');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'ROUTINE_ACCESS_CLASS', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };


  render() {
    const {beanStatus} = this.state;
    let {
       _routine: {
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
                })(<Input placeholder='' addonAfter={<Icon type='search' onClick={this.handleRoutineTypeClick} />} />)
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
                  initialValue: moment(object.createTime)
                })(<DatePicker placeholder='' />)
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
                  initialValue: moment(object.endTime)
                })(<DatePicker placeholder='' />)
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
                })(<Input placeholder='' addonAfter={<Icon type='search' onClick={this.handleVisibilityClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='日常活动标题'>
              {
                getFieldDecorator('title', {
                  initialValue: object.title
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='组织名称'>
              {
                getFieldDecorator('orgName', {
                  initialValue: object.orgName
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

export default RoutineForm;
