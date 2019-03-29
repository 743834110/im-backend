import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {
  Modal
} from 'antd'

export default class SelectEntityModal extends PureComponent {



  state = {
    selectedRows: [],
    visible: true,
  };

  /**
   * 点击完成按钮是进行选择参数的回调
   */
  handelOk = () => {
    const {handleOk, multiple} = this.props;
    const {selectedRows} = this.state;

    // 单选而选择多行数据时
    if (!multiple && selectedRows instanceof Array && selectedRows.length > 1) {
      Modal.info({
        title: '温馨提示',
        content: (
          <span>
            请选择单行数据
          </span>
        )
      });
      setTimeout(() => {
        Modal.destroyAll()
      }, 1000);
      return;
    }

    this.setState({
      visible: false
    });
    handleOk(selectedRows);
  };

  /**
   * 选中当前行事件
   * @param rows
   */
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleCancel = () => {
    const {handleOk} = this.props;
    this.setState({
      visible: false
    });

    handleOk();
  };

  render() {
    const {title, children, param} = this.props;
    const {visible} = this.state;
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={visible}
        align='center'
        width='75%'
        onOk={this.handelOk}
        onCancel={this.handleCancel}
      >
        {
          React.cloneElement(children, {
            handleSelectRows: this.handleSelectRows,
            param: param
          })
        }
      </Modal>
    );
  }
}

/**
 * 组件属性
 * @type {{}}
 */
SelectEntityModal.propTypes = {
  multiple: PropTypes.bool,
  title: PropTypes.string,
  handleOk: PropTypes.func,
  /**
   * 传递的参数
   */
  param: PropTypes.object,
};

/**
 * 设置组件属性默认值
 * @type {{}}
 */
SelectEntityModal.defaultProps = {
  /**
   * 是否多选
   */
  multiple: false,
  /**
   * 对话框标题
   */
  title: '新建',
  /**
   * 点击确认按钮事件
   */
  handleOk:(event) => {console.log(event)},
  /**
   * 默认参数
   */
  param: null
};


