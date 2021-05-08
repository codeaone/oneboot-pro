import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, DatePicker, Card, Popconfirm } from 'antd';
import { useRequest } from 'umi';
import { useOneTable, useOneDelete, useOnePageInit } from '@/components/utils/oneHooks';
// import CreactModal from './components/creactModal';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import TableX from '@/components/table';

const { RangePicker } = DatePicker;

const { Option } = Select;

const restUrl = '/api/smstemplates';

const CreactModal =(props) =>{
  const { children, modalType } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="趋势图" form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="ICCID" name="iccid" type="input" modifyText />
        <FormItem label="卡片类型" name="tpEvent" type="treeselect" required />
        <FormItem label="号牌号码" name="carNo" type="input" required  ruleType="mobile"/>
        <FormItem label="查询时段" name="range" type="datepicker" rangeStart="start" rangeEnd="end"/>
      </FormModal>
    </>
  );
}

function Example() {
  const [form] = Form.useForm();

  
  const columns = [
    { title: '号牌号码', dataIndex: 'carNo' },
    {
      title: '交易类型',
      dataIndex: 'tradeTypeEnums',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    { title: '企业名称', dataIndex: 'companyName', width: '20%' },
    { title: '上车时间', dataIndex: 'upTime', sorter: true },
    { title: '下车时间', dataIndex: 'downTime', sorter: true },
    { title: '载客里程(公里)', dataIndex: 'driveKm' },
    { title: '空驶里程(公里)', dataIndex: 'emptyDriveKm' },
    { title: '运营金额(元)', dataIndex: 'totalPrice' },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <DeleteConfirm id={record.id} url="/api/forms" text={`号牌号码：${record.carNo}`} searchSubmit={submit}>
            删除
          </DeleteConfirm>
        </div>
      ),
    },
  ];

  const { initData, runInit } = useOnePageInit(restUrl + '/init');

  const { tableProps, search } = useOneTable('/api/taxi/operation', { test: '2323' }, form,columns);

  // console.log(tableProps);
  // console.log(search);


  const { submit } = search;

  useEffect(() => {
    runInit();
    // 页面查询的，应该要自动发起才行，页面上的数据要从服务端获取哟
    submit();
  }, []);


  return (
    <Card bodyStyle={{ padding: 12 }}>
      <div className="_normal">
        <div className="_create">
          <CreactModal modalType="create" searchSubmit={submit}>
            <Button>新加</Button>
          </CreactModal>
          <CreactModal modalType="edit" searchSubmit={submit}>
            <Button>修改</Button>
          </CreactModal>
        </div>
        <div className="_search">
          <FormSearch form={form} onFinish={submit} initData={initData}>
            <FormItem label="ICCID" name="iccid" type="input" />
            <FormItem label="卡片类型" name="tpEvent" type="select" />
            <FormItem label="号牌号码" name="carNo" type="input"/>
            <FormItem label="查询时段" name="range" type="rangepicker" rangeStart="start" rangeEnd="end" defaultRange="first7days" />
          </FormSearch>
        </div>
      </div>

      <br />
      <TableX rowKey="recordId" columns={columns} {...tableProps} initData={initData} size="small" />
    </Card>
  );
}

export default Example;
