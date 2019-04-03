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
import SelectUser from "../User/SelectUser";
import SelectOrganization from "../Organization/SelectOrganization";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _userOrg, loading }) => ({
  _userOrg,
  submitting: loading.effects['_userOrg/add'],
}))
@Form.create()
class UserOrgForm extends PureComponent {

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
        type: '_userOrg/fetchOne',
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
        type = '_userOrg/add';
        break;
      case "update":
        type = '_userOrg/update';
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
   * 处理组织点击事件
   */
  handleOrgClick = () => {
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
      console.log(res[0]);
      setFieldsValue({
        ...res[0],
        parentOrgId: res[0].parentId,
      });
    };
    const orgId = getFieldValue('orgId');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{orgId}}>
        <SelectOrganization />
      </SelectEntityModal>
    );
  };

  /**
   * 选择学生
   */
  handleUserClick = () => {
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
        'userName': res[0].userName,
        'userId': res[0].userId
      });
    };
    const userName = getFieldValue('userName');
    const userId = getFieldValue('userId');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{userName, userId}}>
        <SelectUser />
      </SelectEntityModal>
    );
  };


  render() {
    const {beanStatus} = this.state;
    let {
      _userOrg: {
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
              getFieldDecorator('userOrgId', {
                initialValue: object.userOrgId
              })(<Input type='hidden' placeholder='' />)
            }
            {
              getFieldDecorator('userId', {
                initialValue: object.userId
              })(<Input type='hidden' placeholder='' />)
            }
            {
              getFieldDecorator('orgId', {
                initialValue: object.orgId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='用户名称'>
              {
                getFieldDecorator('userName', {
                  initialValue: object.userName
                })(<Input placeholder='' addonAfter={<Icon type='search' onClick={this.handleUserClick}/>} />)
              }
            </FormItem>
            {
              getFieldDecorator('roleId', {
                initialValue: object.roleId
              })(<Input type='hidden' placeholder='' />)
            }
            {
              getFieldDecorator('parentOrgId', {
                initialValue: object.parentOrgId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='组织类型'>
              {
                getFieldDecorator('orgType', {
                  initialValue: object.orgType
                })(<Input placeholder='' disabled />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='年级'>
              {
                getFieldDecorator('grade', {
                  initialValue: object.grade
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='组织名称'>
              {
                getFieldDecorator('orgName', {
                  initialValue: object.orgName
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleOrgClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户图像url'>
              {
                getFieldDecorator('userImageUrl', {
                  initialValue: object.userImageUrl
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='组织简称'>
              {
                getFieldDecorator('shortName', {
                  initialValue: object.shortName
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

export default UserOrgForm;
