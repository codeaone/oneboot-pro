import React, {useCallback} from 'react';
import { Table ,Tag,Button } from 'antd';
import { getAuthColumn } from '../utils/authTool';
import type {ColumnType, ColumnGroupType} from 'antd/lib/table/interface'
import type { TableProps } from 'antd/lib/table';
import type {TableXProps} from './typing';
import Toolbar from './components/ToolBar';
import type { TableCurrentDataSource, SorterResult, SortOrder } from 'antd/lib/table/interface';
import {
  useDeepCompareEffect,
  omitUndefined,
  useMountMergeState,
  useEditableArray,
} from '@ant-design/pro-utils';

function TableX<T extends Record<string, unknown>>(props: TableXProps<T> & {
  defaultClassName: string;
}) {
  const { children, selectedRows = [], shwoRows = false,searchItem=[],closeSearchTag ,sortedInfo,setSortedInfo, ...rest} = props;
  //请求服务端
  const selectRow = (record: any) => {
    const nselectedRowKeys = [...selectedRows];
    if (nselectedRowKeys.indexOf(record.key) >= 0) {
      nselectedRowKeys.splice(nselectedRowKeys.indexOf(record.key), 1);
    } else {
      nselectedRowKeys.push(record.key);
    }
    // setSelectedRowKeys(selectedRowKeys);
    // onSelectChange(nselectedRowKeys);
  };

  const onSelectChange = (selectedRowKeys: string[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    if (props.onSelectRow) {
      props.onSelectRow(selectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    // selectedRowKeys,
    onChange: onSelectChange,
  };

  // 进行权限控制
  const columns = getAuthColumn(props.columns, props.useName);
  const _tableOpts = {
    rowKey: (record: any) => record.id,
    ...rest,
    columns: columns,
  };

  columns.map(col => {
    console.log(sortedInfo);
    if(col.sorter) {
      col.sortOrder=sortedInfo?.field === col.dataIndex && sortedInfo.order;
      console.log(col);
      
    }
  })
  // console.log(props);

  /**
   * 清空所有的选中项
   */
  // const onCleanSelected = useCallback(() => {
  //   if (propsRowSelection && propsRowSelection.onChange) {
  //     propsRowSelection.onChange([], []);
  //   }
  //   setSelectedRowsAndKey([], []);
  // }, [propsRowSelection, setSelectedRowsAndKey]);

  const resetAll= () => {
    // // 清空选中行
    // onCleanSelected();
    // // 清空筛选
    // setProFilter({});
    // // 清空排序
    // setProSort({});
    // // 清空 toolbar 搜索
    // counter.setKeyWords(undefined);
    // // 重置页码
    // action.resetPageIndex();
    console.log("====resetAll=====");
    
  };

  const [proSort, setProSort] = useMountMergeState<Record<string, SortOrder>>({});

  const dangerClick =()=>{
    setProSort({});
    // console.log(setSortedInfo);
    
    setSortedInfo && setSortedInfo(null);
  }
  return (
    <div>
      <div>
      <Toolbar<T>
        columns={columns}
        searchItem={searchItem}
        closeSearchTag={closeSearchTag}
        // options={options}
        headerTitle="表格"
        toolbar={{
          title: '高级表格',
          tooltip: '这是一个标题提示',
        }}
        toolBarRender={() => [
          <Button key="danger" danger onClick={dangerClick}>
            危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,
        ]}
        
      />
      </div>
      <Table
        size="small"
        {..._tableOpts}
        onRow={record => ({
          onClick: () => {
            selectRow(record);
          },
        })}
        onChange={props.onChange}
        rowSelection={shwoRows && rowSelection} />
    </div>
  );
}

export default TableX;
