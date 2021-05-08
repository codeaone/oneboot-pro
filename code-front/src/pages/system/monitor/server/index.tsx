import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Divider, Input } from 'antd';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
// import CreactModal from './components/creactModal';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';

const restUrl = '/api/system/server';

const CreactModal = (props: any) => {
  const { children, modalType, id, searchSubmit } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="系统用户" searchSubmit={searchSubmit} id={id} form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="登录名称" name="name" type="input" />
        <FormItem label="用户状态" name="state" type="select" />
        <FormItem label="用户姓名" name="realName" type="input" />
      </FormModal>
    </>
  );
};

export type TableListItem = {
  id: string;
  name: string;
  title: string;
  dataIndex: string;
  progress: number;
};

function Example() {
  const [form] = Form.useForm();

  const columns = [
    { title: '用户ID', dataIndex: 'id' },
    { title: '登录名称', dataIndex: 'name' },
    { title: '用户姓名', dataIndex: 'realName', sorter: true },
    { title: '部门', dataIndex: 'downTime', sorter: true },
    { title: '手机号', dataIndex: 'mobileNo' },
    { title: '用户状态', dataIndex: 'state' },
    { title: '创建时间', dataIndex: 'gmtCreate', sorter: true },
    { title: '最后登录时间', dataIndex: 'gmtLastLogin' },
    { title: '最后登录IP', dataIndex: 'lastLoginIp' },
    {
      title: '操作',
      key: 'operation',
      width: 90,
      render: (text: string, record: any) => (
        <div>
          <DeleteConfirm id={record.id} url={restUrl} text={`登录名称：${record.realName}`} searchSubmit={submit}>
            删除
          </DeleteConfirm>
          <Divider type="vertical" />
          <CreactModal id={record.id} modalType="edit" searchSubmit={submit}>
            <a>修改</a>
          </CreactModal>
        </div>
      ),
    },
  ];

  const { initData, runInit } = useOnePageInit(restUrl + '/init');

  const { tableProps, search,setColumns } = useOneTable(restUrl, {}, form);

  // console.log(tableProps);
  // console.log(search);

  const { submit } = search;

  useEffect(() => {
    runInit();
    // 页面查询的，应该要自动发起才行，页面上的数据要从服务端获取哟
    submit();
    setColumns(columns);
  }, []);

  return (
    <Card bodyStyle={{ padding: 12 }}>
      <div className="_normal">
        <div className="_create">
          <CreactModal modalType="create" searchSubmit={submit}>
            <Button>新加</Button>
          </CreactModal>
        </div>
        <div className="_search">
          <FormSearch form={form} onFinish={submit} initData={initData}>
            <FormItem label="登录名称" name="name" type="input" />
            <FormItem label="用户状态" name="state" type="select" />
            <FormItem label="用户姓名" name="realName" type="input" />
          </FormSearch>
        </div>
      </div>

      <br />
      <Table rowKey="id" columns={columns} {...tableProps} size="small" />
    </Card>
  );
}

export default Example;
