import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card } from 'antd';
import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
// import CreactModal from './components/creactModal';
import DeleteConfirm from '@/components/from/DeleteConfirm';
import FormSearch from '@/components/from/FormSearch';
import FormItem from '@/components/from/FormItem';

const restUrl = '/api/system/operatelog';

function Example() {
  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '系统模块', dataIndex: 'tradeTypeEnums' },
    { title: '操作类型', dataIndex: 'companyName', width: '20%' },
    { title: '操作人员', dataIndex: 'upTime', sorter: true },
    { title: '部门名称', dataIndex: 'downTime' },
    { title: '主机', dataIndex: 'driveKm' },
    { title: '操作地点', dataIndex: 'emptyDriveKm' },
    { title: '操作状态', dataIndex: 'status' },
    { title: '操作时间', dataIndex: 'gmtCreate', sorter: true },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <DeleteConfirm id={record.id} url="/api/forms" text={`号牌号码：${record.carNo}`} searchSubmit={submit}>
            详情
          </DeleteConfirm>
        </div>
      ),
    },
  ];

  const { initData, runInit } = useOnePageInit(restUrl + '/init');

  const { tableProps, search } = useOneTable(restUrl, {}, form, columns);

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
            <FormItem label="ICCID" name="iccid" type="input" />
            <FormItem label="卡片类型" name="tpEvent" type="select" />
            <FormItem label="号牌号码" name="carNo" type="input" />
            <FormItem label="查询时段" name="range" type="rangepicker" rangeStart="start" rangeEnd="end" defaultRange="first7days" />
          </FormSearch>
        </div>
      </div>

      <br />
      <Table rowKey="recordId" columns={columns} {...tableProps} size="small" />
    </Card>
  );
}

export default Example;
