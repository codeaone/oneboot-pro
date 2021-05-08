import React, { useEffect, useState } from 'react';
import { Card, Tabs, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Banner from './banner';
import MainList from './mainlist';
import '../index.less';

function Example() {
  const [menukey, setMenukey] = useState('banner');

  const handleClick = (e: any) => {
    console.log('click ', e);
    setMenukey(e.key);
  };

  const renderChildren = () => {
    switch (menukey) {
      case 'banner':
        return <Banner />;
      case 'mainlist':
        return <MainList />;
      default:
        break;
    }

    return null;
  };

  return (
    <div className="params_main">
      <div className="leftMenu">
        <Menu onClick={handleClick} selectedKeys={[menukey]} mode="inline">
          <Menu.Item key="banner" icon={<SettingOutlined />}>
            微信服务号
          </Menu.Item>
          <Menu.Item key="mainlist" icon={<AppstoreOutlined />}>
            微信小程序
          </Menu.Item>
        </Menu>
      </div>
      <div className="right">{renderChildren()}</div>
    </div>
  );
}

export default Example;
