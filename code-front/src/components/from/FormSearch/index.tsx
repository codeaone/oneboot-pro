import React, { useState, useEffect } from 'react';
import { Table, Modal, Space, Pagination, Form, Input, Button, Select, DatePicker, Card, Tabs, message } from 'antd';
import { useRequest } from 'ahooks';
import { useOneTable, key, useOnePost, useOnePageInit } from '@/components/utils/oneHooks';
import request from '@/utils/request';
import { FormInstance } from 'antd/lib/form';

export type ModalType = 'create' | 'update';

export type FormSearchProps = {
  /** 请求的URL地址，向服务器请求的是Rest风格的API */
  url?: string;
  title?: string | React.ReactNode;

  form: FormInstance;

  modalType?: ModalType;

  /** 在修改时，需要用到ID字段 */
  id?: string;

  initData: any;

  onFinish: () => void;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const FormSearch: React.FC<FormSearchProps> = ({ url, initData, title, children, form, modalType ,onFinish}) => {
  const itemOpts = {
    initData,
    modalType,
    url,
    form,
    search: true,
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
      <Form layout="inline" form={form} onFinish={onFinish} name="control-hooks">
        {_children}
        <Button className="_search_button" type="primary" htmlType="submit">
          搜索
        </Button>
      </Form>
    </>
  );
};

export default FormSearch;
