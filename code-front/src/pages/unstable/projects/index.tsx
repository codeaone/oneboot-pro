import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Divider, Input } from 'antd';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
// import CreactModal from './components/creactModal';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import { history } from 'umi';

const restUrl = '/api/unstable/projects';

const CreactModal = (props: any) => {
  const { children, modalType, id, searchSubmit } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="项目" searchSubmit={searchSubmit} id={id} form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="项目名" name="name" type="input" required />
        <FormItem label="代码模板" name="tempPath" type="select" required />
        <FormItem label="项目包名" name="basePackage" type="input" required extra="项目的包名 com.codeaone.codefactory" />
        <FormItem label="存放位置" name="rootPath" type="input" required extra="生成文件的存放位置 D:\code\temp\" />
        <FormItem label="前端代码位置" name="frontPath" type="input" required extra="前端代码位置 D:\code\temp-antd\" />
        <FormItem label="工程结构" name="single" type="radio" required extra="是否为单工程结构" />
        <FormItem label="备注" name="desc" type="input" />
      </FormModal>
    </>
  );
};

const ConfigModal = (props: any) => {
  const { children, modalType, id, searchSubmit } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal
        title="配置信息"
        searchSubmit={searchSubmit}
        id={id}
        form={form}
        modalType={modalType}
        url={restUrl}
        postUrl={restUrl + '/config'}
        button={children}
      >
        <FormItem label="项目名" name="name" type="input" modifyText />
        <FormItem label="数据库类型" name="dbType" type="select" required />
        <FormItem label="URL" name="url" type="input" required extra="请输入完整的连接地址" />
        <FormItem label="username" name="username" type="input" required />
        <FormItem label="password" name="password" type="input" required extra="密码会加密存储，请放心使用" />
        <FormItem label="是否覆盖" name="overlayGen" type="select" required extra="是否覆盖生成代码" />
        <FormItem label="我需要" name="needFun" type="checkbox" required />
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

  const onGenerate = (record: any) => {
    history.push({
      pathname: '/unstable/factory',
      query: { id: record.id },
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '项目名', dataIndex: 'name' },
    { title: '包名', dataIndex: 'basePackage' },
    { title: '数据库', dataIndex: 'dbType' },
    { title: '备注', dataIndex: 'name1' },
    { title: '创建时间', dataIndex: 'gmtCreate' },
    {
      title: '操作',
      key: 'operation',
      width: 180,
      render: (text: string, record: any) => (
        <div>
          <CreactModal id={record.id} modalType="edit" searchSubmit={submit}>
            <a>编辑</a>
          </CreactModal>
          <Divider type="vertical" />
          <ConfigModal id={record.id} modalType="edit" searchSubmit={submit}>
            <a>配置</a>
          </ConfigModal>
          <Divider type="vertical" />
          <DeleteConfirm id={record.id} url={restUrl} text={`登录名称：${record.realName}`} searchSubmit={submit}>
            删除
          </DeleteConfirm>
          <Divider type="vertical" />
          <a onClick={() => onGenerate(record)}>generate</a>
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
            <FormItem label="项目名" name="name" type="input" />
          </FormSearch>
        </div>
      </div>

      <br />
      <Table rowKey="id" columns={columns} {...tableProps} size="small" />
    </Card>
  );
}

export default Example;
