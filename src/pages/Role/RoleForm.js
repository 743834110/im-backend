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
  Icon
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from '../../formStyle.less';
import FooterToolbar from "../../components/FooterToolbar";
import SelectEntityModal from "../../components/SelectEntityModal";
import {generateDynamicElement} from "../../utils/utils";
import SelectDictionary from "../Dictionary/SelectDictionary";
import AuthTableForm from '../Auth/AuthTableForm';

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


  /**
   * 处理角色类型点击事件
   */
  handleRoleTypeClick = () => {
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
        'roleType': res[0].codeId
      });
    };
    const codeId = getFieldValue('roleType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'ROLE', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };  


  render() {
    const {beanStatus} = this.state;
    const {match: {params}} = this.props;
    let {
      _role: {
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
              getFieldDecorator('roleId', {
                initialValue: object.roleId,
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='角色名称'>
              {
                getFieldDecorator('roleName', {
                  initialValue: object.roleName,
                  rules: [{required: true, message: "必填项"}]
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色描述'>
              {
                getFieldDecorator('roleDescription', {
                  initialValue: object.roleDescription,
                  rules: [{required: true, message: "必填项"}]
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色类型' >
              {
                getFieldDecorator('roleType', {
                  initialValue: object.roleType,
                  rules: [{required: true, message: "必选项"}]
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleRoleTypeClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='角色数量'>
              {
                getFieldDecorator('roleNumber', {
                  initialValue: object.roleNumber
                })(<Input placeholder='' />)
              }
            </FormItem>
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
            <FormItem {...formItemLayout} label='角色所属平台'>
              {
                getFieldDecorator('platform', {
                  initialValue: object.platform,
                  rules: [{required: true, message: "必填项"}]
                })(
                  <Select value='app'>
                    <Option value='app'>移动端</Option>
                    <Option value='admin'>后台管理系统</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Card>
        {
          beanStatus === 'update' &&
          <Card title='角色资源管理' style={{marginTop: '20px'}}>
            <AuthTableForm param={{authId: object.authId || params.authId}} />
          </Card>
        }

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

export default RoleForm;
