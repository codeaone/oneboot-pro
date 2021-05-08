import React, { useState } from 'react';
import BaseInfo from './components/BaseInfo';
import BindingInfo from './components/BindingInfo';
import Notification from './components/Notification';
import Security from './components/Security';
import styles from './style.less';

import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export type SettingProps = {
  /** 请求的URL地址 */
  url: string;
};

const Setting: React.FC<SettingProps> = ({ url, children }) => {
  const [selectKey, setSelectKey] = useState('base');
  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseInfo />;
      case 'security':
        return <Security />;
      case 'binding':
        return <BindingInfo />;
      case 'notification':
        return <Notification />;
      default:
        break;
    }

    return null;
  };

  const handleClick = (e: any) => {
    console.log('click ', e);
    const { key } = e;
    setSelectKey(key);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu onClick={handleClick} style={{ width: 256 }} selectedKeys={[selectKey]} mode="inline">
            <Menu.Item key="base" icon={<MailOutlined />}>
              基本设置
            </Menu.Item>
            <Menu.Item key="security" icon={<AppstoreOutlined />}>
              安全设置
            </Menu.Item>
            <Menu.Item key="binding" icon={<SettingOutlined />}>
              账号绑定
            </Menu.Item>
            <Menu.Item key="notification" icon={<SettingOutlined />}>
              新消息通知
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.right}>{renderChildren()}</div>
      </div>
    </>
  );
};

export default Setting;
