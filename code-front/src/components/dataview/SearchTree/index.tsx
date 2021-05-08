import React, { useState } from 'react';
import { Tree, Input } from 'antd';

export interface SearchTreeProps {
  urls?: string | string[];
  treeData: any[];
  onSelect?: (selectedKeys: React.ReactText[], info: any) => void;
  selectTitle?: React.ReactNode;
  icon?: React.ReactNode;
  addonAfter?: React.ReactNode;
}

const { TreeNode } = Tree;
const { Search } = Input;

let dataList: any[] = [];
const generateList = (data: string | any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    dataList.push(node);
    if (node.children) {
      generateList(node.children);
    }
  }
};

const getParentKey = (key: any, tree: string | any[]) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: { value: any }) => item.value === key)) {
        parentKey = node.value;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey || '';
};

const SearchTree: React.FC<SearchTreeProps> = ({ treeData, ...props }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.ReactText[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<React.ReactText[]>([]);

  const onExpand = (expandedKeys: React.ReactText[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  const onChange = (e: { target: { value: any } }) => {
    const { value } = e.target;

    const expandedKeys = dataList
      .map(item => {
        if (item.label.indexOf(value) > -1) {
          return getParentKey(item.value, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
    setSearchValue(value);
  };

  const onSelect = (selectedKeys: React.ReactText[], info: any) => {
    if (selectedKeys.length > 0) {
      setSelectedKeys(selectedKeys);
      props.onSelect && props.onSelect(selectedKeys, info);
    }
  };

  var selectedKey = selectedKeys[0];
  dataList = [];
  generateList(treeData);

  const loop = (data: any[]) =>
    data.map(item => {
      const index = item.label.indexOf(searchValue);
      const beforeStr = item.label.substr(0, index);
      const afterStr = item.label.substr(index + searchValue.length);
      // 如果条件，就更改字体
      let title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.label}</span>
        );
      // 处理选中显示
      if (selectedKey === item.value) {
        title = (
          <span>
            {title} &nbsp;&nbsp;
            {props.selectTitle}
          </span>
        );
      }
      const icon = props.icon;
      if (item.children) {
        return (
          <TreeNode key={item.value} title={title} icon={icon}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.value} title={title} icon={icon} />;
    });

  return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} addonAfter={props.addonAfter} />
      <Tree showIcon onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onSelect={onSelect}>
        {loop(treeData)}
      </Tree>
    </div>
  );
};

export default SearchTree;
