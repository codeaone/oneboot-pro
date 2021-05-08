import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';

import { CurrentUser } from '../data.d';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './index.less';

const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>Avatar</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          Change avatar
        </Button>
      </div>
    </Upload>
  </>
);

interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

export type BaseInfoProps = {
  /** 请求的URL地址 */
  url?: string;

  currentUser?: CurrentUser;
};

const BaseInfo: React.FC<BaseInfoProps> = ({ url, children, currentUser = {} }) => {
  function getAvatarURL() {
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  }

  function handleFinish() {}

  return (
    <>
      <div className={styles.title}>基本配置</div>
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form layout="vertical" onFinish={handleFinish} initialValues={currentUser} hideRequiredMark>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="昵称"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="profile"
              label="个人简介"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea placeholder="profile" rows={4} />
            </Form.Item>
            <Form.Item
              name="geographic"
              label="所在省市"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <GeographicView />
            </Form.Item>
            <Form.Item
              name="address"
              label="街道地址"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: 'phone',
                },
                { validator: validatorPhone },
              ]}
            >
              <PhoneView />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={getAvatarURL()} />
        </div>
      </div>
    </>
  );
};

export default BaseInfo;
