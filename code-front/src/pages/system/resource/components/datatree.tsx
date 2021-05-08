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
    name: '巡检管理',
    label: '巡检管理',
    pinyin: '巡检管理xunjianguanli',
    children: [
      { value: 'clockclockinspection.menu', name: '巡检记录', label: '巡检记录', pinyin: '巡检记录xunjianjilu', children: null, disabled: false },
      { value: 'clockfeedback.menu', name: '反馈列表', label: '反馈列表', pinyin: '反馈列表fankuiliebiao', children: null, disabled: false },
    ],
    disabled: false,
  },
  {
    value: 'comments.menu',
    name: '合作公司管理',
    label: '合作公司管理',
    pinyin: '合作公司管理hezuogongsiguanli',
    children: [
      { value: 'comment.menu', name: '评论记录', label: '评论记录', pinyin: '评论记录pinglunjilu', children: null, disabled: false },
      { value: 'commentoption.menu', name: '选项管理', label: '选项管理', pinyin: '选项管理xuanxiangguanli', children: null, disabled: false },
      { value: 'company.menu', name: '合作公司', label: '合作公司', pinyin: '合作公司hezuogongsi', children: null, disabled: false },
    ],
    disabled: false,
  },
  {
    value: 'content.menu',
    name: '内容管理',
    label: '内容管理',
    pinyin: '内容管理neirongguanli',
    children: [
      { value: 'catalog.menu', name: '目录', label: '目录', pinyin: '目录mulu', children: null, disabled: false },
      { value: 'contentposts.menu', name: '文章', label: '文章', pinyin: '文章wenzhang', children: null, disabled: false },
    ],
    disabled: false,
  },
  {
    value: 'project.menu',
    name: '项目管理',
    label: '项目管理',
    pinyin: '项目管理xiangmuguanli',
    children: [
      { value: 'projectlist.menu', name: '项目列表', label: '项目列表', pinyin: '项目列表xiangmuliebiao', children: null, disabled: false },
      { value: 'projectmember.menu', name: '成员管理', label: '成员管理', pinyin: '成员管理chengyuanguanli', children: null, disabled: false },
      {
        value: 'projectprogrestemp.menu',
        name: '项目进度模板',
        label: '项目进度模板',
        pinyin: '项目进度模板xiangmujindumoban',
        children: null,
        disabled: false,
      },
      { value: 'projectsettings.menu', name: '项目配置', label: '项目配置', pinyin: '项目配置xiangmupeizhi', children: null, disabled: false },
    ],
    disabled: false,
  },
  {
    value: 'sms.menu',
    name: '短信管理',
    label: '短信管理',
    pinyin: '短信管理duanxinguanli',
    children: [
      { value: 'smsmessage.menu', name: '发送记录', label: '发送记录', pinyin: '发送记录fasongjilu', children: null, disabled: false },
      { value: 'smstemplate.menu', name: '短信模板', label: '短信模板', pinyin: '短信模板duanxinmoban', children: null, disabled: false },
    ],
    disabled: false,
  },
  {
    value: 'system.menu',
    name: '系统管理',
    label: '系统管理',
    pinyin: '系统管理xitongguanli',
    children: [
      { value: 'systemdictionary.menu', name: '数据字典', label: '数据字典', pinyin: '数据字典shujuzidian', children: null, disabled: false },
      { value: 'systemoperatelog.menu', name: '操作记录', label: '操作记录', pinyin: '操作记录caozuojilu', children: null, disabled: false },
      { value: 'systemresource.menu', name: '权限资源', label: '权限资源', pinyin: '权限资源quanxianziyuan', children: null, disabled: false },
      { value: 'systemsystemconfig.menu', name: '系统配置', label: '系统配置', pinyin: '系统配置xitongpeizhi', children: null, disabled: false },
      { value: 'systemteammember.menu', name: '系统用户', label: '系统用户', pinyin: '系统用户xitongyonghu', children: null, disabled: false },
      { value: 'systemteamrole.menu', name: '系统角色', label: '系统角色', pinyin: '系统角色xitongjiaose', children: null, disabled: false },
    ],
    disabled: false,
  },
  { value: 'welcome.menu', name: 'welcome', label: 'welcome', pinyin: 'welcomewelcome', children: null, disabled: false },
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
