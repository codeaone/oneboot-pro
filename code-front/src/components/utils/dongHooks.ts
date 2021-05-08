import Nprogress from 'nprogress';
import request from '@/utils/request';
import { useAntdTable, useRequest } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';

/**
 * 发起Get请求
 *
 * @param url 请求URL
 * @param params 请求参数
 */
function useOneGet(url: string, params: any) {
  const { loading, data, run } = useRequest(
    (args: any) => {
      return request(url, {
        params: args,
      });
    },
    { ...params },
  );

  return { loading, data, run };
}

/**
 * 
 */

function formatResult(res: { data: { result: any[]; totalCount: any } }) {
  console.log(res);
  
  if(res.success) {
    let data = {
      list: res.data.result,
      total: res.data ? res.data.totalCount : 0,
    };
    // debugger
    if (data.list === undefined && res.data instanceof Array) {
      data.list = res.data;
      data.total = data.list.length;
    }

    if (data.list === undefined && res.data.datas instanceof Array) {
      data.list = res.data.datas;
      data.total = res.data.totalPages;
    }

    return data;
  } else {
    return {list:[],total:0}
  }
  
}
// /**
//  * 针对洞头项目的请求
//  */

// function formatResult(res: { data: { datas: any[]; totalRecords: any } }) {
//   let data = {
//     list: res.data ? res.data.datas : [],
//     total: res.data ? res.data.totalRecords : 0,
//   };
//   // debugger
//   if (data.list === undefined && res.data instanceof Array) {
//     data.list = res.data;
//     data.total = data.list.length;
//   }
//   return data;
// }

function useOneTable(url: string, params: any, form: any, formatForm: (arg0: any) => any) {
  const { tableProps, search } = useAntdTable(
    ({ current, pageSize, filters, sorter }: PaginatedParams[0], formData: Object) => {
      const data = formatForm ? formatForm(formData) : formData;
      return request.get(url, {
        params: {
          ...params,
          sortField: sorter?.field,
          sortOrder: sorter?.order,
          current,
          pageSize,
          ...filters,
          ...data,
        },
      });
    },
    {
      defaultPageSize: 10,
      form,
      formatResult,
    },
  );
  const { loading, pagination, ...resProps } = tableProps;
  //   console.log(resProps);

  let page = pagination;
  page.showTotal = total => ` 共 ${total} 条`;
  page.hideOnSinglePage = true;

  if (loading) {
    Nprogress.start();
  } else {
    Nprogress.done(true);
  }

  return { tableProps: { pagination: page, ...resProps }, search };
}

export { useOneTable,useOneGet };
