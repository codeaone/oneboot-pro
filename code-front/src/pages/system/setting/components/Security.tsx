import React from 'react';
import { Popconfirm } from 'antd';
import type { SelectProps } from 'antd/lib/select';

export type SecurityProps = {
  /** 请求的URL地址 */
  url?: string;
}

const Security: React.FC<SecurityProps> = ({ url, children }) => {
  return (
    <>
      <div>Security</div>
    </>
  );
};

export default Security;
