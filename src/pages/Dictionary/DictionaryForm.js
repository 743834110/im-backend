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
@connect(({ _dictionary, loading }) => ({
  _dictionary,
  submitting: loading.effects['_dictionary/add'],
}))
@Form.create()
class DictionaryForm extends PureComponent {

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
        type: '_dictionary/fetchOne',
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
        type = '_dictionary/add';
        break;
      case "update":
        type = '_dictionary/update';
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
      , _dictionary: {
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
                getFieldDecorator('dictionaryId', {
                  initialValue: object.dictionaryId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem>
              {
                getFieldDecorator('codeItemId', {
                  initialValue: object.codeItemId
                })(<Input type='hidden' placeholder='' />)
              }
            </FormItem>  
            <FormItem>
              {
                getFieldDecorator('codeId', {
                  initialValue: object.codeId
                })(<Input type='hidden' placeholder='' />)
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
                  initialValue: object.createTime
                })(<Input placeholder='' />)
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
                  initialValue: object.modifyTime
                })(<Input placeholder='' />)
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
          <Button style={{ marginLeft: 8 }}>
            <FormattedMessage id="form.save" />
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default DictionaryForm;