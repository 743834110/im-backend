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
   * 处理权限类型点击事件
   */
  handleAuthTypeClick = () => {
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
        'authType': res[0].codeId
      });
    };
    const codeId = getFieldValue('authType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'AUTH', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };  


  render() {
    const {beanStatus} = this.state;
    let {
      _auth: {
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
              getFieldDecorator('authId', {
                initialValue: object.authId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='资源名称'>
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
            {
              getFieldDecorator('parentId', {
                initialValue: object.parentId
              })(<Input type='hidden' placeholder='' />)
            }
            <FormItem {...formItemLayout} label='权限类型' >
              {
                getFieldDecorator('authType', {
                  initialValue: object.authType
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleAuthTypeClick} />} />)
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
          <Button htmlType="button" style={{ marginLeft: 8 }} onClick={this.handleNavigateBack}>
            返回
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AuthForm;