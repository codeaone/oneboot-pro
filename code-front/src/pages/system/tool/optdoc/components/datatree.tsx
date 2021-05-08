import React, { useEffect, useState } from 'react';
import { Card, Tabs, Menu, Modal, Form } from 'antd';
import { TeamOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { EditForm, SearchTree } from '@/components';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import _ from 'lodash';

const restUrl = '/api/system/role';

const treeData = [
  {
    value: 'clock.menu',
    name: '第 Ⅰ 部分：社区',
    label: '第 Ⅰ 部分：社区',
    pinyin: '巡检管理xunjianguanli',
    children: [
      { value: 'clockclockinspection.menu', name: '社区介绍', label: '社区介绍', pinyin: '巡检记录xunjianjilu', children: null, disabled: false },
      { value: 'clockfeedback.menu', name: '项目介绍', label: '项目介绍', pinyin: '反馈列表fankuiliebiao', children: null, disabled: false },
    ],
    disabled: false,
  },
];

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

function Example(props: any) {
  // const treeData = _.get(props, 'newData.treeData', []);

  const [selectedKeys, setSelectedKeys] = useState<any>([]);

  const onSelect = (selectedKeys: any[], info: any) => {
    if (selectedKeys.length > 0) {
      // 这里需要有modal出来了，在这个场景上使用下吧
      //   this.setState({ selectedKeys });
      setSelectedKeys(selectedKeys);
      //   // 拿不到有效数据，那只能去查询一下咯
      //   service.get(selectedKeys[0]).then(d => {
      //     console.log(d);
      //     dispatch({
      //       type: 'resources/dosetstate',
      //       payload: { selectTreeItem: d.data },
      //     });
      //     dispatch({
      //       type: 'resources/query',
      //       payload: { parentCode: d.data.code, subType: d.data.code },
      //     });
      //   });
    }
  };

  const onAdd = () => {
    const key = selectedKeys[0];
    if (!key) {
      return;
    }
  };

  const onDeleteCatalog = (key: any) => {};

  const onDelete = () => {
    const key = selectedKeys[0];
    if (!key) {
      return;
    }
    // const onDeleteItem = this.props
    Modal.confirm({
      title: '确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据无法恢复，请慎重操作！',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        () => onDeleteCatalog(key);
      },
    });
  };

  const submit = () => {};

  const addonAfter = (
    <CreactModal zIndex={9999} maskClosable={false} modalType="create" searchSubmit={submit}>
      <PlusCircleOutlined style={{ cursor: 'pointer' }} />
    </CreactModal>
  );

  const selectTitle = (
    <span>
      <CreactModal zIndex={9999} maskClosable={false} modalType="create" searchSubmit={submit}>
        <PlusCircleOutlined
          style={{ color: '#52c41a' }}
          onClick={() => {
            onAdd();
          }}
        />
      </CreactModal>
      &nbsp;&nbsp;
      <DeleteOutlined
        style={{ color: 'red' }}
        onClick={() => {
          onDelete();
        }}
      />
    </span>
  );

  const icon = <TeamOutlined />;

  return (
    <div className="params_main">
      <SearchTree treeData={treeData} onSelect={onSelect} addonAfter={addonAfter} selectTitle={selectTitle} icon={icon} />
    </div>
  );
}

export default Example;
