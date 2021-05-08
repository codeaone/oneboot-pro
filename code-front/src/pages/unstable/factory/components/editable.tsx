import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { EditableTable } from '@/components';

export interface OneInputProps extends InputProps {
  initData?: any;
  typeName?: any;
}

const dataSource = [
  {
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: '32',
    address: 'London, Park Lane no. 1',
  },
];

const columns = [
  {
    title: '字段',
    dataIndex: 'name',
  },
  {
    title: '页面名称',
    dataIndex: 'age',
    editable: true,
    required: true,
  },
  {
    title: '控件类型',
    dataIndex: 'itemType',
    editable: true,
    type: 'select',
    required: true,
  },
  {
    title: '校验类型',
    dataIndex: 'itemRule',
    type: 'multiselect',
    editable: true,
  },
  {
    title: '其他配置',
    dataIndex: 'config',
    type: 'checkbox',
    editable: true,
    width: '30%',
  },
  {
    title: '依赖表',
    dataIndex: 'ext2',
    editable: true,
  },
  {
    title: '数据字典',
    dataIndex: 'ext3',
    editable: true,
  },
];
/**
 * 输入框
 * @param props
 */
const OneInput: React.FC<OneInputProps> = props => {
  //这样写会更清晰一些
  const { children, initData, typeName, onChange, ...restProps } = props;

  return <EditableTable dataSource={dataSource} columns={columns} initData={initData}/>;
};

// OneInput.defaultProps = {
//   initData: {},
// };

OneInput.displayName = 'OneInput';

export default OneInput;
