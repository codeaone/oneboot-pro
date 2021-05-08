import React from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';
import type { OneFieldFC } from '../index';

export interface OneTreeSelectProps extends TreeSelectProps {
  initData?: any;
  typeName: string;

  /** 查询场景 */
  search?: boolean;
}

/**
 * 输入框
 * @param props
 */
const OneTreeSelect: OneFieldFC<OneTreeSelectProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, initData = {}, typeName = '', ...restProps } = props;

  let options = [];
  if (initData[typeName] instanceof Array) {
    options = initData[typeName];
  }

  const treeProps = {
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    treeData: options,
    allowClear: true,
    ...restProps,
  };

  return (
    <TreeSelect showSearch treeNodeFilterProp="pinyin" placeholder="请选择" {...treeProps} options={options} />
  );
};


OneTreeSelect.displayName = 'OneTreeSelect';

export default React.forwardRef(OneTreeSelect);
