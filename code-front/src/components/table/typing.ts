import type {ColumnType, ColumnGroupType} from 'antd/lib/table/interface'
import type { TableProps } from 'antd/lib/table';

export type ActionType = {
  fullScreen?: () => void;
};

export type TableRowSelection = TableProps<any>['rowSelection'];

export type ExtraColumnType<T> = Omit<
  ColumnType<T>,
  'render' | 'children' | 'title' | 'filters' | 'onFilter'
>;


export type OneColumnType<T = unknown> = ExtraColumnType<T> & {
  /** 是否缩略 */
  ellipsis?: boolean;
  /** 是否拷贝 */
  copyable?: boolean;
  /** 表头的筛选菜单项 */
  filter?: boolean;
}

export type OneColumnGroupType<RecordType> = {
  children: OneColumns<RecordType>[];
} & OneColumnType<RecordType>;

export type OneColumns<T = any> = OneColumnGroupType<T> | OneColumnType<T>;

export type ProColumns<T = any> = OneColumns<T> ;

export type TableXProps<T> = {
  shwoRows?: boolean;

  columns?: OneColumns<T>[];

  useName: string;
  sortedInfo: any;

  closeSearchTag:(name:string) => void;
  setSortedInfo:(info:any) => void;

  searchItem?:any[];
  /** 删除成功后，需要再提交查询操作 */
  onChange?: () => void;
  onSelectRow?: (selectedRowKeys: string[]) => void;

  selectedRows?: any[];
} & Omit<TableProps<T>, 'columns' | 'rowSelection'>;
