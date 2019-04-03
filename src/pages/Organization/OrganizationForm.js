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
import SelectOrganization from "./SelectOrganization";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _organization, loading }) => ({
  _organization,
  submitting: loading.effects['_organization/add'],
}))
@Form.create()
class OrganizationForm extends PureComponent {

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
        type: '_organization/fetchOne',
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
        type = '_organization/add';
        break;
      case "update":
        type = '_organization/update';
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
   * 处理组织类型点击事件
   */
  handleOrgTypeClick = () => {
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
        'orgType': res[0].codeId
      });
    };
    const codeId = getFieldValue('orgType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'ORGANATION', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };  

  /**
   * 处理专业类型点击事件
   */
  handleProTypeClick = () => {
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
        'proType': res[0].codeId
      });
    };
    const codeId = getFieldValue('proType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'PRO', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };  

  /**
   * 处理${column.comment}点击事件
   */
  handleAssociateTypeClick = () => {
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
        'associateType': res[0].codeId
      });
    };
    const codeId = getFieldValue('associateType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'ASSOCIATE', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };

  /**
   * 处理${column.comment}点击事件
   */
  handleParentIdClick = () => {
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
        'parentId': res[0].orgId
      });
    };
    const orgId = getFieldValue('parentId');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{orgId}}>
        <SelectOrganization />
      </SelectEntityModal>
    );
  };


  render() {
    const {beanStatus} = this.state;
    let {
      _organization: {
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
                getFieldDecorator('orgId', {
                  initialValue: object.orgId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='父级机构'>
              {
                getFieldDecorator('parentId', {
                  initialValue: object.parentId
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleParentIdClick} />}  />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='组织类型'>
              {
                getFieldDecorator('orgType', {
                  initialValue: object.orgType
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleOrgTypeClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='专业类型'>
              {
                getFieldDecorator('proType', {
                  initialValue: object.proType
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleProTypeClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='组织描述'>
              {
                getFieldDecorator('orgDescription', {
                  initialValue: object.orgDescription
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
            <FormItem {...formItemLayout} label='组织头像地址'>
              {
                getFieldDecorator('orgImageUrl', {
                  initialValue: object.orgImageUrl
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='组织公告'>
              {
                getFieldDecorator('orgAnnounce', {
                  initialValue: object.orgAnnounce
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
            <FormItem>
              {
                getFieldDecorator('userId', {
                  initialValue: object.userId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='创建时间'>
              {
                getFieldDecorator('createTime', {
                  initialValue: moment(object.createTime)
                })(<DatePicker placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='年级'>
              {
                getFieldDecorator('grade', {
                  initialValue: object.grade
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='${column.comment}'>
              {
                getFieldDecorator('shortName', {
                  initialValue: object.shortName
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='${column.comment}' >
              {
                getFieldDecorator('associateType', {
                  initialValue: object.associateType
                })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleAssociateTypeClick} />} />)
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

export default OrganizationForm;
