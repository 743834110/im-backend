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
import SelectDictionaryType from "../Dictionary/DictionaryForm";
import SelectUser from "../User/SelectUser";
import SelectChatGroup from "../ChatGroup/SelectChatGroup";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _workGroupMember, loading }) => ({
  _workGroupMember,
  submitting: loading.effects['_workGroupMember/add'],
}))
@Form.create()
class WorkGroupMemberForm extends PureComponent {

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
        type: '_workGroupMember/fetchOne',
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
        type = '_workGroupMember/add';
        break;
      case "update":
        type = '_workGroupMember/update';
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

  handleUserAccountClick = () => {
    let modal;
    const {form: {setFieldsValue, getFieldValue}} = this.props;
    /**
     * 数据回调，设置表单的值
     * @param res
     */
    const handleModalOk = (res) => {
      modal.destory();
      if (!res || res.constructor !== Array || res.length === 0) {
        return;
      }
      const {form: {setFieldsValue}} = this.props;
      setFieldsValue({
        ...res[0]
      });
    };
    const userId = getFieldValue("userId");
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{userId}}>
        <SelectUser/>
      </SelectEntityModal>
    );
  };

  handleChatGroupIdClick = () => {
    let modal;
    const {form: {setFieldsValue, getFieldValue}} = this.props;
    /**
     * 数据回调，设置表单的值
     * @param res
     */
    const handleModalOk = (res) => {
      modal.destory();
      if (!res || res.constructor !== Array || res.length === 0) {
        return;
      }
      const {form: {setFieldsValue}} = this.props;
      setFieldsValue({
        chatGroupId: res[0].groupId
      });
    };
    const groupId = getFieldValue("chatGroupId");
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{groupId}}>
        <SelectChatGroup/>
      </SelectEntityModal>
    );
  }



  render() {
    const {beanStatus} = this.state;
    let {
      _workGroupMember: {
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
              getFieldDecorator('memberId', {
                initialValue: object.memberId
              })(<Input type='hidden' placeholder='' />)
            }
            {
              getFieldDecorator('userId', {
                initialValue: object.userId,

              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='用户账号'>
              {
                getFieldDecorator('userAccount', {
                  initialValue: object.userAccount,
                  rules: [{required: true, message: "必选项"}]
                })(<Input placeholder='' addonAfter={<Icon type="search" onClick={this.handleUserAccountClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='群组编号'>
              {
                getFieldDecorator('chatGroupId', {
                  initialValue: object.chatGroupId,
                  rules: [{required: true, message: "必选项"}]
                })(<Input placeholder='' addonAfter={<Icon type='search' onClick={this.handleChatGroupIdClick} />}  />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户名称'>
              {
                getFieldDecorator('userName', {
                  initialValue: object.userName
                })(<Input placeholder=''  />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='头像地址'>
              {
                getFieldDecorator('memberImageUrl', {
                  initialValue: object.memberImageUrl
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

export default WorkGroupMemberForm;
