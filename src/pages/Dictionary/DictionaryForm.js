import React, { PureComponent} from 'react';
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
  Modal,
  Icon,
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from '../../formStyle.less';
import FooterToolbar from "../../components/FooterToolbar";
import SelectDictionaryType from "../DictionaryType/SelectDictionaryType";
import SelectEntityModal from "../../components/SelectEntityModal";
import {generateDynamicElement} from "../../utils/utils";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 * 需动态生成
 */
@connect(({ _dictionary, loading }) => ({
  _dictionary,
  submitting: loading.effects['_dictionary/add'],
}))
@Form.create()
class DictionaryForm extends PureComponent {

  // 实体状态
  state = {
    beanStatus: 'add',
    modalVisible: false
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
        type: '_dictionary/fetchOne',
        payload: params
      });
    }
  }


  /**
   * 提交表单信息
   * @param e
   */
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const {beanStatus} = this.state;
    e.preventDefault();
    let type;
    switch (beanStatus) {
      case "add":
        type = '_dictionary/add';
        break;
      case "update":
        type = '_dictionary/update';
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
   * 打开选择对话框
   */
  handleSelectEntity = () => {

    let modal;

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
        'codeItemId': res[0].codeItemId
      });
    };

    modal = generateDynamicElement(
      <SelectEntityModal handleOk={handleModalOk}>
        <SelectDictionaryType />
      </SelectEntityModal>
    );
  };



  render() {
    const {beanStatus} = this.state;
    let {
      _dictionary: {
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
                getFieldDecorator('dictionaryId', {
                  initialValue: object.dictionaryId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='分类编号'>
              {
                getFieldDecorator('codeItemId', {
                  initialValue: object.codeItemId
                })(<Input placeholder='' addonAfter={<Icon type='search' onClick={this.handleSelectEntity} />}   />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='具体分类编号'>
              {
                getFieldDecorator('codeId', {
                  initialValue: object.codeId
                })(<Input placeholder='' />)
              }
            </FormItem>  
            <FormItem {...formItemLayout} label='具体分类名称'>
              {
                getFieldDecorator('codeName', {
                  initialValue: object.codeName
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
            <FormItem {...formItemLayout} label='创建人ID'>
              {
                getFieldDecorator('createPerson', {
                  initialValue: object.createPerson
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='修改时间'>
              {
                getFieldDecorator('modifyTime', {
                  initialValue: moment(object.modifyTime)
                })(<DatePicker placeholder='' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='修改人ID'>
              {
                getFieldDecorator('modifyPerson', {
                  initialValue: object.modifyPerson
                })(<Input placeholder='' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('parentCodeId', {
                  initialValue: object.parentCodeId
                })(<Input type='hidden' placeholder='' />)
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

export default DictionaryForm;
