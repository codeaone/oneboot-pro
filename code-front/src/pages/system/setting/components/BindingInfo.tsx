import React from 'react';
import { Popconfirm } from 'antd';
import type { SelectProps } from 'antd/lib/select';

export type BindingInfoProps = {
  /** 请求的URL地址 */
  url?: string;
}

const BindingInfo: React.FC<BindingInfoProps> = ({ url, children }) => {
  return (
    <>
      <div>BindingInfo</div>
    </>
  );
};

export default BindingInfo;
