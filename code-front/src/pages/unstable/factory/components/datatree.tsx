import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Card, Divider, Input, Alert } from 'antd';
import { TeamOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { EditForm, SearchTree } from '@/components';
import { AudioOutlined } from '@ant-design/icons';

import { useOneTable, useOnePageInit } from '@/components/utils/oneHooks';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import FormSearch from '@/components/from/FormSearch';
import _ from 'lodash';
import { history } from 'umi';

const { Search } = Input;

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

function Example(props: any) {
  const [form] = Form.useForm();
  console.log(history.location);

  const { id = '0' } = history.location.query;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    { title: 'table name', dataIndex: 'tableName' },
    { title: '备注', dataIndex: 'remark' },
  ];

  const { initData, runInit } = useOnePageInit(restUrl + `/init?id=${id}`);

  const { tableProps, search, setColumns } = useOneTable(restUrl, {id}, form);

  // console.log(tableProps);
  // console.log(search);

  const { submit } = search;

  useEffect(() => {
    runInit();
    // 页面查询的，应该要自动发起才行，页面上的数据要从服务端获取哟
    submit();
    setColumns(columns);
  }, []);

  const onSearch = (value: any) => console.log(value);

  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectRow = (record: any) => {
    console.log(record);

    const _selectedRowKeys = [...selectedRowKeys];
    if (_selectedRowKeys.indexOf(record.id) >= 0) {
      _selectedRowKeys.splice(_selectedRowKeys.indexOf(record.id), 1);
    } else {
      _selectedRowKeys.push(record.id);
    }
    setSelectedRowKeys(_selectedRowKeys);
    //还要把当前点击的同步到右边
  };

  const onRow = (record: any) => ({
    onClick: () => {
      selectRow(record);
    },
  });

  const cleanSelectedKeys = () => {
    setSelectedRowKeys([]);
  };

  return (
    <div className="params_main1">
      <div>
        <Search placeholder="search table" allowClear enterButton="Search" onSearch={onSearch} />
        <br />
        {selectedRowKeys.length > 0 ? (
          <Alert
            message={
              <span>
                已选择 {selectedRowKeys.length} 条
                <a onClick={cleanSelectedKeys} style={{ marginLeft: 14 }}>
                  清空
                </a>
                <CreactModal modalType="create">
                  <a style={{ marginLeft: 14 }}>批量生成</a>
                </CreactModal>
              </span>
            }
            type="success"
          />
        ) : null}
      </div>
      <div>
        <Table rowKey="id" columns={columns} {...tableProps} rowSelection={rowSelection} onRow={onRow} size="small" />
      </div>
    </div>
  );
}

export default Example;
