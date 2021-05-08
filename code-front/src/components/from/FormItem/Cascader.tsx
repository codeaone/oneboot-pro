import React from 'react';
import { Cascader } from 'antd';

export type CascaderXProps = {
  initData?: any;

  typeName: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;
  onChange?: (name: string, value: string | undefined) => void;
};

const CascaderX: React.FC<CascaderXProps> = ({onChange, initData = {}, typeName, search = false, typeOpts = {}, placeholder, ...restProps }) => {
  let options = [];
    if (initData[typeName] instanceof Array) {
      options = initData[typeName];
    }
  return (
    <>
      <Cascader showSearch placeholder="请选择" {...restProps} {...typeOpts} onChange={onChange} options={options} />
    </>
  );
};

export default CascaderX;
