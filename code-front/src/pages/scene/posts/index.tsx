import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Divider, Input } from 'antd';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
// import CreactModal from './components/creactModal';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import FormItem from '@/components/from/FormItem';
import { history } from 'umi';

const restUrl = '/api/scene/posts';

function Example() {
  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'name' },
    { title: '状态', dataIndex: 'realName', sorter: true },
    { title: '类别', dataIndex: 'downTime', sorter: true },
    { title: '摘录', dataIndex: 'mobileNo' },
    { title: '发布日期', dataIndex: 'state' },
    { title: '创建时间', dataIndex: 'gmtCreate', sorter: true },
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
          <a onClick={() => onEditItem(record.id)}>修改</a>
        </div>
      ),
    },
  ];

  const { initData, runInit } = useOnePageInit(restUrl + '/init');

  const { tableProps, search, setColumns } = useOneTable(restUrl, {}, form);

  // console.log(tableProps);
  // console.log(search);

  const { submit } = search;

  useEffect(() => {
    runInit();
    // 页面查询的，应该要自动发起才行，页面上的数据要从服务端获取哟
    submit();
    setColumns(columns);
  }, []);

  const handleAdd = () => {
    history.push({
      pathname: '/scene/posts/edit',
      query: {},
    });
  };

  const onEditItem = (id: string) => {
    history.push({
      pathname: '/scene/posts/edit',
      query: { id },
    });
  };

  return (
    <Card bodyStyle={{ padding: 12 }}>
      <div className="_normal">
        <div className="_create">
          <Button onClick={handleAdd}>新加</Button>
        </div>
        <div className="_search">
          <FormSearch form={form} onFinish={submit} initData={initData}>
            <FormItem label="标题" name="name" type="input" />
            <FormItem label="状态" name="state" type="select" />
            <FormItem label="类别" name="realName" type="input" />
          </FormSearch>
        </div>
      </div>

      <br />
      <Table rowKey="id" columns={columns} {...tableProps} size="small" />
    </Card>
  );
}

export default Example;
