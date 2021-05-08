import React, {useState} from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined,ProfileOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/lib/select';
import { Avatar, Menu, Spin,Dropdown } from 'antd';
import { history } from 'umi';
import ModifyPassModel from '../from/Password';

export type AvatarDropdownProps = {
  /** 请求的URL地址 */
  url?: string;
  pushMenu:(path:string)=> void;
  isNeedResetPassword?:boolean;
  resetPassword?:string;
}



const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ url, children ,pushMenu, isNeedResetPassword=false, resetPassword}) => {
  const [passVisible, setPassVisible] = useState(false);

  function hideModelHandler() {
    setPassVisible(false);
  }
    function handleMenuClick(e:any) {
      console.log(e);
      
      const {key} = e;
      switch (key) {
        case 'center':
          pushMenu('/system/operatelog')
          break;
        case 'setting':
          pushMenu('/system/setting')
          break;
        case 'modifyPws':
          setPassVisible(true);
          break;
        case 'logout':
          window.location.href = window.path + "/logout";

      return;
      
        default:
          break;
      }
    }

    const menu = (
        <Menu className="action-menu" selectedKeys={[]} onClick={handleMenuClick}>
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
          <Menu.Item key="setting">
            <SettingOutlined />
            个人设置
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="modifyPws">
            <ProfileOutlined />
            修改密码
          </Menu.Item>
          <Menu.Item key="logout">
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        </Menu>
      );

  return (
    <>
     <Dropdown overlay={menu} className="action" overlayClassName="action-menu-dropdown">
              <span className="action-account">
                <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                <span className="name">{window.user?window.user.username:'test'}</span>
              </span>
            </Dropdown>
            <ModifyPassModel isNeedResetPassword={isNeedResetPassword}  hideModelHandler={hideModelHandler} visible={passVisible} resetPassword={resetPassword}/>
            </>
  );
};

export default AvatarDropdown;
