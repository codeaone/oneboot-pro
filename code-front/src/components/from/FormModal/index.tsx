import React, { useState, useEffect } from 'react';
import { Table, Modal, Space, Pagination, Form, Input, Button, Select, DatePicker, Card, Tabs, message } from 'antd';
import { useRequest } from 'ahooks';
import { useOneTable, key, useOnePost, useOnePageInit } from '@/components/utils/oneHooks';
import request from '@/utils/request';
import { FormInstance } from 'antd/lib/form';

export type ModalType = 'create' | 'update';

export type FormModalProps = {
  /** 请求的URL地址，向服务器请求的是Rest风格的API */
  url: string;
  postUrl?: string;
  title: string | React.ReactNode;

  form: FormInstance;

  modalType: ModalType;

  /** 在修改时，需要用到ID字段 */
  id?: string;

  button: string | React.ReactNode;
  searchSubmit: () => void;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const FormModal: React.FC<FormModalProps> = ({ url, id, title, children, button, form, postUrl, modalType, searchSubmit }) => {
  const { initData, runInit } = useOnePageInit(url + '/init');

  // const subUrl = 

  const { modalProps, setVisible } = useOnePost(postUrl?postUrl:url, form, {}, searchSubmit, modalType, id);

  function showModal() {
    runInit();

    if (modalType != 'create') {
      request.get(`${url}/${id}`).then(res => {
        console.log(res.data);
        form.setFieldsValue(res.data);
      });
    } else {
      //看一下是否有默认值回来
      //initData
      console.log(modalType + '====' + initData);
      if (initData?.initData) {
        form.setFieldsValue(initData.initData);
      }
    }

    console.log('=======runInit========');
    console.log(initData);

    setVisible(true);
  }

  const itemOpts = {
    initData,
    modalType,
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
      <Modal title={title} {...modalProps}>
        <Form {...layout} form={form} name="control-hooks">
          {_children}
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
