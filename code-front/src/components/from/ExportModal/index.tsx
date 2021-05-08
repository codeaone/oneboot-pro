import React, { useState } from 'react';
import { Modal, Radio, Form, message } from 'antd';
import request from '@/utils/request';
import qs from 'qs';

export type ModalType = 'create' | 'update';

export type ExportModalProps = {
  /** 请求的URL地址，向服务器请求的是Rest风格的API */
  url: string;
  title: string | React.ReactNode;

  modalType: ModalType;

  /** 在修改时，需要用到ID字段 */
  id?: string;

  formItem?: any;
  searchItem?: any;
};

const ExportModal: React.FC<ExportModalProps> = ({ url, title, children, formItem = {}, searchItem = {}, modalType }) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const hideModelHandler = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  const okHandler = () => {
    form
      .validateFields()
      .then(values => {
        setConfirmLoading(true);
        const data = {
          ...values,
          id: formItem.id,
          ...searchItem,
        };
        request(`${url}/export/check?${qs.stringify(data)}`).then(d => {
          if (d && !d.success) {
            message.error(d.message);
            setConfirmLoading(true);
          } else {
            request(window.path + `${url}/export?${qs.stringify(data)}`)
              .then(res => res.blob())
              .then(blob => {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = d.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                hideModelHandler();
                form.resetFields();
              });
          }
        });
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  function showModal() {
    setVisible(true);
  }

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
  };

  const modalOpts = {
    title: '导出 Excel 文件',
    visible: visible,
    onOk: okHandler,
    okText: '下载',
    onCancel: hideModelHandler,
    confirmLoading: confirmLoading,
    maskClosable: false,
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal {...modalOpts}>
        <Form layout="horizontal" {...layout}>
          <Form.Item label="导出数据集" name="exportDataType" rules={[{ required: true, message: '请选择导出数据集!' }]}>
            <Radio.Group>
              {/* <Radio.Button value="1">选择中数据</Radio.Button> */}
              <Radio.Button value="2">查询条件</Radio.Button>
              <Radio.Button value="3">全部数据</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExportModal;
