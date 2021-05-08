import React from 'react';
import { Popconfirm } from 'antd';
import type { SelectProps } from 'antd/lib/select';

export type NotificationProps = {
  /** 请求的URL地址 */
  url?: string;
}

const Notification: React.FC<NotificationProps> = ({ url, children }) => {
  return (
    <>
      <div>Notification</div>
    </>
  );
};

export default Notification;
