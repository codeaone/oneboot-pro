import React from 'react';
import { Input } from 'antd';

export type InputXProps = {
  initData?: any;

  typeName: string;
  value: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;

  onChange?: (name: string, value: string | undefined) => void;
};

const InputX: React.FC<InputXProps> = ({ onChange, value, initData = {}, typeName, search = false, typeOpts = {}, placeholder, ...restProps }) => {
  return (
    <>
      <Input {...typeOpts} value={value} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

export default InputX;
