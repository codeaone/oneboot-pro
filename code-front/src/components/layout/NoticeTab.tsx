import React from 'react';
import { Badge, Spin, Tabs } from 'antd';
import type { SelectProps } from 'antd/lib/select';
import { BellOutlined } from '@ant-design/icons';

export type NoticeTabProps = {
  /** 请求的URL地址 */
  url?: string;
}

const NoticeTab: React.FC<NoticeTabProps> = ({ url, children }) => {
  return (
    <span className="action notice">
      <Badge count={0} style={{ boxShadow: 'none' }} className="badge">
        <BellOutlined className="icon"/>
      </Badge>
    </span>

  );
};

export default NoticeTab;
