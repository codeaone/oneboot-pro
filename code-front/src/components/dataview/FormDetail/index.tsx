import React, { useState } from 'react';
import { Form, Modal, message, Row, Alert } from 'antd';
import _ from 'lodash';
import { useOneDelete } from '@/components/utils/oneHooks';

export interface DeleteBatchModalProps {
  /** 请求的URL地址 */
  url: string;

  children: React.ReactNode;
  /** 删除时更清晰的提示 */
  text?: string;

  /** 需要删除的ID，这里可以是多个哟 */
  id: string;
  /** 所需要的权限code */
  auth?: string;

  /** 删除成功后，需要再提交查询操作 */
  searchSubmit?: () => void;

  selectedRows?: any[];
}

const DeleteBatchModal: React.FC<DeleteBatchModalProps> = ({ url, children, selectedRows = [], auth, id, text, searchSubmit }) => {
  //请求服务端
  const { popProps, runDelete, showPopconfirm } = useOneDelete(url, { text, searchSubmit });

  const okHandler = () => {
    const ids = selectedRows.join(',');
    runDelete(ids);
  };

  const modalOpts = {
    title: '批量删除数据',
    visible: popProps.visible,
    onOk: okHandler,
    okText: '删除',
    onCancel: popProps.onCancel,
    confirmLoading: popProps.okButtonProps.loading,
  };

  return (
    <span>
      <span onClick={showPopconfirm}>{children}</span>
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <Row>
            <Alert
              style={{ width: '100%' }}
              message={
                <div>
                  当前已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 数据
                </div>
              }
              description="删除后无法恢复，请确认操作."
              type="warning"
              showIcon
            />
          </Row>
        </Form>
      </Modal>
    </span>
  );
};

export default DeleteBatchModal;
