import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, ConfigProvider, BackTop, Dropdown, Avatar, Tooltip, Space } from 'antd';
import { history, Link,Helmet } from 'umi';
// import { getMatchMenu } from '@umijs/route-utils';
import { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from './typings';

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import AvatarDropdown from './AvatarDropdown';
import NoticeTab from './NoticeTab';

moment.locale('zh-cn');

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

import './BasicLayout.less';

export interface BasicLayoutProps {
  logo?: string;
  title: string;
  children: React.ReactNode;
  menus: MenuDataItem[];
  index: string;
}

//请查阅官方文档：https://zh-hans.reactjs.org/docs/hooks-intro.html

function BasicLayout(props: BasicLayoutProps) {
  const { logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg', children, menus = [], title ,index } = props;
  //= 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg'
  // 声明一个新的叫做 “count” 的 state 变量
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [siderMenus, setSiderMenus] = useState<MenuDataItem[]>([]);
  const [selectedTopKey, setSelectedTopKey] = useState(['0']);
  const [selectedSiderKey, setSelectedSiderKey] = useState(['0']);

  // console.log(getMatchMenu);


  // const unlisten = history.listen((location, action) => {
  //   console.log("===========action============" + action);

  //   console.log(location.pathname);
  //   const pathname = location.pathname;
  //   // setMenusKey(pathname);
  // });

  // unlisten();

  function setMenusKey(pathname: string) {
    const arr = pathname.split('/');
    const item = `/${arr[1]}`;
    // console.log(item);

    const sider = menus.filter(m => m.path === item);
    // console.log(sider);

    if (sider && sider.length > 0) {
      if(sider[0].hidded) {
        return;
      }
      const siderChildren = sider[0].children || [];
      if (siderChildren) {
        setSiderMenus(siderChildren);
        setSelectedSiderKey([pathname]);
        // 跳转到指定路由
      }
      setPageTitle(sider[0].name)
      setSelectedTopKey([sider[0].path]);
    } else {
      console.log('==========setDefaultOpenKey===========');

      setDefaultOpenKey();
    }
  }

  useEffect(() => {
    if (menus) {
      if ('POP' === history.action) {
        //在这里，匹配上菜单
        const pathname = history.location.pathname;
        //dashboard/monitor/outline
        setMenusKey(pathname);
      } else {
        setDefaultOpenKey();
      }
    }
  }, []);

  function setDefaultOpenKey() {
    const siderChildren = menus[0].children || [];
    if (siderChildren) {
      setSiderMenus(siderChildren);
      setSelectedSiderKey([siderChildren[0].path]);
      // 跳转到指定路由
      history.push(siderChildren[0].path);
    }
    setPageTitle(menus[0].name);
    setSelectedTopKey([menus[0].path]);
  }

  // history 栈里的实体个数
  // console.log(history.length);
  // // 当前 history 跳转的 action，有 PUSH、REPLACE 和 POP 三种类型
  // console.log(history.action);
  // // location 对象，包含 pathname、search 和 hash
  // console.log(history.location.pathname);
  // console.log(history.location.search);
  // console.log(history.location.hash);

  function topMenuClick(item: any) {
    const sider = menus.filter(m => m.path === item.key);

    if (sider) {
      const siderChildren = sider[0].children || [];
      if (siderChildren) {
        setSiderMenus(siderChildren);
        setSelectedSiderKey([siderChildren[0].path]);
        // 跳转到指定路由
        history.push(siderChildren[0].path);
      }
      setPageTitle(sider[0].name);
      setSelectedTopKey([sider[0].path]);
    }
    // 要选择
  }

  function siderMenuClick(item: any) {
    // console.log(item);

    setSelectedSiderKey([item.key]);
    //还是要路由哟
    history.push(item.key);
  }

  const pushMenu =(path: string)=> {
    const arr = path.split('/');
    const item = `/${arr[1]}`;
    // console.log(item);

    const sider = menus.filter(m => m.path === item);

    if (sider && sider.length > 0) {
      const siderChildren = sider[0].children || [];
      if (siderChildren) {
        setSiderMenus(siderChildren);
        // 跳转到指定路由
      }
      setPageTitle(sider[0].name);
      setSelectedTopKey([sider[0].path]);
    }

    setSelectedSiderKey([path]);
    //还是要路由哟
    history.push(path);
  }
  const _pageTitle = pageTitle ? `${pageTitle}-${title}`: title;
  // console.log(_pageTitle);

  const _menus = menus.filter(m=> !m.hidded);
  return (
    <ConfigProvider locale={zhCN}>
      <BackTop visibilityHeight={150} />
      <Helmet>
        <title>{_pageTitle}</title>
      </Helmet>
      <Layout id="components-layout-side" key="Layout">
        <Header className="header" id="header">
          <div className="header-left">
            <div className="logo" key="logo" id="logo">
              <Link to={index}>
                <img src={logo} alt="logo" />
                <h1>{title}</h1>
              </Link>
            </div>
            <Menu theme="dark" mode="horizontal" onClick={topMenuClick} selectedKeys={selectedTopKey}>
              {_menus.map((node: MenuDataItem) => (
                <Menu.Item key={node.path}>{node.name}</Menu.Item>
              ))}
            </Menu>
          </div>
          <div className="header-right">
            <Tooltip title="使用文档">
              <a target="_blank" href="https://www.baidu.com" rel="noopener noreferrer" className="action">
                <QuestionCircleOutlined />
              </a>
            </Tooltip>
            <NoticeTab />
            <AvatarDropdown pushMenu={pushMenu} />
          </div>
        </Header>
        <Layout key="Layout-Sider">
          <Sider width={200} className="site-layout-background">
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} selectedKeys={selectedSiderKey} onClick={siderMenuClick}>
              {siderMenus.map((node: MenuDataItem) => {
                return (

                    node.children ? (
                      <Menu.ItemGroup key={node.path} title={node.name}>
                        {node.children.map((m: MenuDataItem) => (
                          <Menu.Item icon={<UserOutlined />} key={m.path}>
                            {m.name}
                          </Menu.Item>
                        ))}
                      </Menu.ItemGroup>
                    ) : (
                      <Menu.Item icon={<UserOutlined />} key={node.path}>
                        {node.name}
                      </Menu.Item>
                    )

                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 2px 2px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 12,
                margin: 0,
                minHeight: '92vh',
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
