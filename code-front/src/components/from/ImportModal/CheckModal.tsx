import React, { useState } from 'react';
import { Form, Modal, Badge, Table } from 'antd';

export type ImportCheckModalProps = {
  visible: boolean;
  tableLoading: boolean;

  setCheckVisible: (v: boolean) => void;
  onImportFile: () => void;
  importCheckData: any;
  columns?: any[];
};

const ImportCheckModal: React.FC<ImportCheckModalProps> = ({ columns = [], ...props }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const hideModelHandler = () => {
    setConfirmLoading(false);
    props.setCheckVisible(false);
  };

  const okHandler = () => {
    props.setCheckVisible(false);
    props.onImportFile();
  };

  const modalOpts = {
    title: '批量导入数据前置检查',
    visible: props.visible,
    okButtonProps: { disabled: props.importCheckData.status == '-1' },
    cancelText: '重新上传',
    okText: '提交',
    onOk: okHandler,
    onCancel: hideModelHandler,
    confirmLoading: confirmLoading,
    maskClosable: false,
  };

  const _columns = [
    ...columns,
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => {
        if (record.status === '-1') {
          return <Badge status="warning" text="异常" />;
        }
        return <Badge status="success" text="正常" />;
      },
    },
    { title: '说明', dataIndex: 'memo', key: 'memo' },
  ];

  const tableOpts = {
    useName: 'SystemconfigList',
    pathname: '/systemconfigs',
    columns: _columns,
    dataSource: props.importCheckData.data,
    loading: props.tableLoading,
  };

  return (
    <span>
      <Modal {...modalOpts} style={{ width: '75%' }} width="75%">
        <Table {...tableOpts} rowKey="id" />
      </Modal>
    </span>
  );
};

export default ImportCheckModal;
