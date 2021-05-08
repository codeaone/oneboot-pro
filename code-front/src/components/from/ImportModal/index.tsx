import React, { useState, useEffect } from 'react';
import { Table, Modal, Space, Pagination, Form, Input, Button, Select, DatePicker, Card, Tabs, message } from 'antd';
import { useRequest } from 'ahooks';
import { useOneTable, useOnePost, useOnePageInit } from '@/components/utils/oneHooks';
import request from '@/components/utils/request';
import { FormInstance } from 'antd/lib/form';
import ImportCheckModal from './CheckModal';
import qs from 'qs';
export type ModalType = 'create' | 'update';

export type ImportModalProps = {
  /** 请求的URL地址，向服务器请求的是Rest风格的API */
  url: string;
  title: string | React.ReactNode;

  form: FormInstance;
  isImportCheckData?: boolean;

  /** 在修改时，需要用到ID字段 */
  id?: string;

  columns?: any[];

  button: string | React.ReactNode;
  searchSubmit: () => void;
};

const key = 'importModalKey';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const ImportModal: React.FC<ImportModalProps> = ({ url, title, children, button, form, columns, isImportCheckData = false, searchSubmit }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);
  const [importCheckData, setImportCheckData] = useState({});
  const [tableLoading, setTableLoading] = useState(true);

  const { initData, runInit } = useOnePageInit(`${url}/init`);

  const { modalProps, setVisible } = useOnePost(`${url}/import`, form, {});

  const hideModelHandler = () => {
    setVisible(false);
    setConfirmLoading(false);
    setImportCheckData({});
    setTableLoading(true);
    
  };

  /*执行上传*/
  const uploadCallbak = (d: any) => {
    //在这里，需要看isImportCheckData参数的值
    if (isImportCheckData) {
      //发起检查数据请求 importCheck
      let values = form.getFieldsValue();
      const data = {
        ...values,
        fileToken: d,
      };
      hideModelHandler();
      // props.service.importCheck(data).then(d => {
      //   //tableLoading
      //   setImportCheckData(d);
      //   setTableLoading(false);
      // });
    }
    setCheckVisible(isImportCheckData);
  };

  const onImportFile = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
      };
      setConfirmLoading(true);
      message.loading({ content: '正在提交数据...', key });

      request.post(`${url}/import`, { body: qs.stringify(values) }).then(res => {
        console.log(res);

        const { success = false } = res;
        if (success) {
          setVisible(false);
          setConfirmLoading(false);
          // message.success({ content: '操作成功！', key, duration: 1 });
          message.destroy(key);
          Modal.success({
            title: '操作成功',
            content: "成功导入多条数据，失败0条",
            okText: '知道了',
            onOk:()=>{
              if (searchSubmit) {
                searchSubmit();
              }
            }
          });

          
        } else {
          Modal.error({
            title: '操作失败',
            content: res.resultView,
            okText: '知道了',
          });
          message.destroy(key);
          setConfirmLoading(false);
        }
      });

      // props.service.importFile(data).then(serviceCallbak);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const logingTableData = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
      };
      setTableLoading(true);
      message.loading({ content: '正在读取表格数据...', key });

      request(`${url}/import/check?${qs.stringify(values)}`).then(res => {
        console.log(res);
        setTableLoading(false);

        const { success = false } = res;
        if (success) {
          // message.success({ content: '操作成功！', key, duration: 1 });
          message.destroy(key);
          setImportCheckData(res);
        } else {
          Modal.error({
            title: '操作失败',
            content: res.resultView,
            okText: '知道了',
          });
          message.destroy(key);
        }
      });

      // props.service.importFile(data).then(serviceCallbak);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const okHandler = () => {
    if (isImportCheckData) {
      hideModelHandler();
      setCheckVisible(true);
      logingTableData();
    } else {
      onImportFile();
    }
  };

  const modalOpts = {
    title: '文件导入',
    // visible: visible,
    onOk: okHandler,
    onCancel: hideModelHandler,
    confirmLoading: confirmLoading,
    maskClosable: false,
  };

  const checkDataOpts = {
    onImportFile: onImportFile,
    visible: checkVisible,
    importCheckData: importCheckData,
    setCheckVisible: setCheckVisible,
    tableLoading: tableLoading,
    columns: columns,
  };

  function showModal() {
    runInit();

    //看一下是否有默认值回来
    //initData
    if (initData?.initData) {
      form.setFieldsValue(initData.initData);
    }

    console.log('=======runInit========');
    console.log(initData);

    setVisible(true);
  }

  const itemOpts = {
    initData,
    modalType: '',
    url,
    form,
  };

  const _children = React.Children.map(children, (child: any, i) => {
    // console.log(child);
    if (typeof child.type == 'function') {
      // console.log(child.type.name);
      // 只针对x节点做处理
      // if ('FormItemx' === child.type.name) {
      return {
        ...child,
        props: {
          ...itemOpts,
          ...child.props,
        },
      };
      // } else {
      //   return child;
      //   // 这里还需要考虑多层
      // }
    } else {
      return child;
    }
  });

  return (
    <>
      <span onClick={showModal}>{button}</span>
      <Modal {...modalProps} {...modalOpts}>
        <Form {...layout} form={form} name="control-hooks">
          {_children}
        </Form>
      </Modal>
      <span>
        <ImportCheckModal {...checkDataOpts} />
      </span>
    </>
  );
};

export default ImportModal;
