import React from 'react';
import { Popconfirm } from 'antd';
import type { SelectProps } from 'antd/lib/select';

export type AvatarDropdownProps = {
  /** 请求的URL地址 */
  url: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ url, children }) => {
  return (
    <>
      <div></div>
    </>
  );
};

export default AvatarDropdown;
