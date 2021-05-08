import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card } from 'antd';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import { FormItem } from '@/components';
// import { Input } from '@/components/field';

const restUrl = '/api/smstemplates';

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

  const { tableProps, search } = useOneTable('/api/taxi/operation', { test: '2323' }, form, columns);

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
        <div className="_create"></div>
        <div className="_search">
          <FormSearch form={form} onFinish={submit} initData={initData}>
            {/* <FormItem label="ICCID" name="iccid">
              <Input allowClear />
            </FormItem>
            <FormItem label="卡片类型" name="tpEvent">
              <Input allowClear />
            </FormItem>
            <FormItem label="号牌号码" name="carNo">
              <Input allowClear />
            </FormItem>
            <FormItem label="查询时段" name="range">
              <Input allowClear />
            </FormItem> */}
          </FormSearch>
        </div>
      </div>

      <br />
      <Table rowKey="recordId" columns={columns} {...tableProps} initData={initData} size="small" />
    </Card>
  );
}

export default Example;
