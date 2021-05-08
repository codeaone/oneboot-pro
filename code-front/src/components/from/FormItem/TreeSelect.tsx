import React from 'react';
import { TreeSelect } from 'antd';

export type TreeSelectXProps = {
  initData?: any;

  typeName: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;
  onChange?: (name: string, value: string | undefined) => void;
};

const TreeSelectX: React.FC<TreeSelectXProps> = ({ onChange, initData = {}, typeName, search = false, typeOpts = {}, placeholder, ...restProps }) => {
  let options = [];
  if (initData[typeName] instanceof Array) {
    options = initData[typeName];
  }

  const treeProps = {
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    treeData:options,
    allowClear: true,
    placeholder,
    ...restProps,
    ...typeOpts,
  };

  return (
    <>
      <TreeSelect showSearch treeNodeFilterProp="pinyin" placeholder="请选择" {...treeProps} onChange={onChange} options={options} />
    </>
  );
};

export default TreeSelectX;
