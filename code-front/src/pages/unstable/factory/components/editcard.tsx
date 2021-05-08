import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Alert, Button } from 'antd';
import { EditForm, FormSearch } from '@/components';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import EditableTable from './editable';
import { history } from 'umi';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
import '../index.less';
const { TabPane } = Tabs;

const restUrl = '/api/unstable/factory';

const CreactModal = (props: any) => {
  const { children, modalType, id, searchSubmit } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="生成代码" searchSubmit={searchSubmit} id={id} form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="是否覆盖" name="overlayGen" type="select" required extra="是否覆盖生成代码" />
        <FormItem label="我需要" name="needFun" type="checkbox" required />
      </FormModal>
    </>
  );
};

function Example() {
  const [form] = Form.useForm();
  const { initData, runInit } = useOnePageInit(restUrl + '/init');

  useEffect(() => {
    runInit();
  }, []);

  const onPrecode = (id: string) => {
    history.push({
      pathname: '/unstable/factory/precode',
      query: { id },
    });
  };

  return (
    <div>
      <Alert message="Success Text" type="success" />

      <EditForm form={form} url="/api/">
        <FormItem label="登录名称" name="name" type="input" />
        <FormItem label="用户状态" name="state" type="select" />
        <FormItem label="用户姓名" name="realName" type="input" />
      </EditForm>

      <Button onClick={() => onPrecode('d')}>预览代码</Button>

      <CreactModal modalType="create">
        <Button>生成到本地磁盘</Button>
      </CreactModal>

      <EditableTable initData={initData}/>
    </div>
  );
}

export default Example;
