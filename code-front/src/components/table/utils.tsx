import React, { useEffect } from 'react';
import { Space, Tooltip, Form, Typography } from 'antd';

import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import type {
    ActionType,
    OneColumns,
  } from './typing';

/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: React.ReactText | undefined, index?: number): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};


/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
export const genEllipsis = (dom: React.ReactNode, item: OneColumns<any>, text: string) => {
    if (!item.ellipsis) {
      return dom;
    }
    return (
      <Tooltip title={text}>
        <span>{dom}</span>
      </Tooltip>
    );
  };

  
export const genCopyable = (dom: React.ReactNode, item: OneColumns<any>, text: string) => {
    if (item.copyable || item.ellipsis) {
      return (
        <Typography.Text
          style={{
            maxWidth: '100%',
            margin: 0,
            padding: 0,
          }}
          title=""
          copyable={
            item.copyable && text
              ? {
                  text,
                  tooltips: ['', ''],
                }
              : undefined
          }
          ellipsis={item.ellipsis}
        >
          {dom}
        </Typography.Text>
      );
    }
    return dom;
  };