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
  Upload,
  Avatar
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from '../../formStyle.less';
import FooterToolbar from "../../components/FooterToolbar";
import {generateDynamicElement} from "../../utils/utils";
import SelectEntityModal from "../../components/SelectEntityModal";
import SelectDictionary from "../Dictionary/SelectDictionary";
import UserOrgTableForm from "../UserOrg/UserOrgTableForm";
import SelectRole from "../Role/SelectRole";
import {uploadFile} from "../../utils";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _user, loading }) => ({
  _user,
  submitting: loading.effects['_user/add'] || loading.effects['_file/upload'],
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
      console.log(values);
      if (!err) {
	    // 预处理提交数据:主要是为了处理时间问题
        for (const key in values) {
            if ( values[key] && values[key].format) {
                values[key] = values[key] - 0;
            }
        }
        // 进行文件上传操作
        if (values.userImageUrl && values.userImageUrl.length !== 0) {
          let fileData = new FormData();
          console.log(values.userImageUrl[0].originFileObj);
          fileData.append('files', values.userImageUrl[0].originFileObj);
          fileData.append('newFile', JSON.stringify({compId: 'fdfd', busiId: 'dfd'}))
          uploadFile(dispatch, fileData, (res) => {
            values.userImageUrl = res.data.filePath;
            dispatch({
              type,
              payload: values,
              callback: () => {
                this.setState({
                  beanStatus: 'update',
                })
              }
            });
            // 调用子组件值提交方法
            this.child && this.child.handleSubmit();
          })
        }
        // 不需要进行文件上传时直接插入用户信息即可
        else {
          dispatch({
            type,
            payload: values,
            callback: () => {
              this.setState({
                beanStatus: 'update',
              })
            }
          });
          // 调用子组件值提交方法
          this.child && this.child.handleSubmit();
        }
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
   * 处理用户类型点击事件
   */
  handleUserTypeClick = () => {
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
        'userType': res[0].codeId
      });
    };
    const codeId = getFieldValue('userType');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{codeItemId: 'USER', codeId}}>
        <SelectDictionary />
      </SelectEntityModal>
    );
  };

  /**
   * 进行角色编码选择
   */
  handleRoleIdClick = () => {
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
        'roleId': res[0].roleId
      });
    };
    const roleId = getFieldValue('roleId');
    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk} param={{roleId}}>
        <SelectRole/>
      </SelectEntityModal>
    );
  };

  /**
   * 处理点击上传图片事件
   * @param e
   * @returns {*}
   */
  handleSelectImage = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  render() {
    const {beanStatus} = this.state;
    const {match: {params}} = this.props;
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
                  initialValue: object.userAccount,
                  rules: [{required: true, message: "必填项"}]
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户名称'>
              {
                getFieldDecorator('userName', {
                  initialValue: object.userName,
                  rules: [{required: true, message: "必填项"}]
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
            <FormItem {...formItemLayout} label='用户头像'>
              {
                beanStatus === 'add' &&
                getFieldDecorator('userImageUrl', {
                  initialValue: object.userImageUrl,
                  valuePropName: 'fileList',
                  getValueFromEvent: this.handleSelectImage,
                })(
                  <Upload accept="image/*" multiple={false} listType="picture">
                    {
                      (!getFieldValue('userImageUrl') || getFieldValue('userImageUrl').length === 0) &&
                      <Button>
                        <Icon type="upload" /> 点击上传
                      </Button>
                    }
                  </Upload>
                )
              }
              {
                beanStatus === 'update' &&
                  <Avatar src={object.userImageUrl} size='large' shape='square' />
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户描述'>
              {
                getFieldDecorator('userDescription', {
                  initialValue: object.userDescription
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='是否有效'>
              {
                getFieldDecorator('valid', {
                  initialValue: object.valid
                })(
                  <Select>
                    <Option value='Y'>是</Option>
                    <Option value='N'>否</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='账号是否锁定'>
              {
                getFieldDecorator('userAccountLocked', {
                  initialValue: object.userAccountLocked
                })(
                  <Select>
                    <Option value='Y'>是</Option>
                    <Option value='N'>否</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='创建时间'>
              {
                getFieldDecorator('createTime', {
                  initialValue: moment(object.createTime)
                })(<DatePicker placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='修改时间'>
              {
                getFieldDecorator('modifyTime', {
                  initialValue: moment(object.modifyTime)
                })(<DatePicker placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户性别'>
              {
                getFieldDecorator('userSex', {
                  initialValue: object.userSex
                })(
                  <Select>
                    <Option value='MAN'>男</Option>
                    <Option value='WOMAN'>女</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='用户类型'>
              {
                getFieldDecorator('userType', {
                  initialValue: object.userType
                })(<Input disabled placeholder='' addonAfter={<Icon type='search' onClick={this.handleUserTypeClick} />} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='校园短号'>
              {
                getFieldDecorator('userShortMobile', {
                  initialValue: object.userShortMobile
                })(<Input placeholder='' />)
              }
            </FormItem>
            {
              getFieldValue('userType') === 'ADMIN' &&
                <FormItem {...formItemLayout} label='角色编码'>
                  {
                    getFieldDecorator('roleId', {
                      initialValue: object.roleId,
                      rules: [{required: true, message: '必填项'}]
                    })(<Input placeholder='' disabled addonAfter={<Icon type='search' onClick={this.handleRoleIdClick}/>} />)
                  }
                </FormItem>
            }
          </Form>
        </Card>
        {
          beanStatus === 'update' &&
            <Card title='用户所属组织管理' style={{marginTop: '20px'}}>
              <UserOrgTableForm param={{userId: params.userId || object.userId}} triggerRef={(value) => this.child = value} />
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

export default UserForm;
