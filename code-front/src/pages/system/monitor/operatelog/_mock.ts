// 一个标准的mock, 就是一个完整的CRUD操作
import { Request, Response } from 'express';
import { parse } from 'url';
import Mock from 'mockjs';
//在这里需要做下自动成功动作
//在做mock时，其实就是把系统详情的设计完成了，后续只要按照这个逻辑
// 主要是一些实际的数据，和状态与操作

//需要定义出所有的状态值，一些取值空间
// Mock 请参考：http://mockjs.com/examples.html

const api = '/api/system/operatelog';

/**
businessType: 7
businessTypes: null
createBy: null
createTime: null
deptName: "研发部门"
errorMsg: null
jsonResult: "{"msg":"操作成功","code":0}"
method: "com.ruoyi.project.monitor.online.controller.UserOnlineController.batchForceLogout()"
operId: 7080
operIp: "171.41.2.10"
operLocation: "湖北省 黄冈市"
operName: "admin"
operParam: "{"ids":["888d8661-bcdd-44d8-ad8d-772f2abf24fc"]}"
operTime: "2021-01-22 22:04:50"
operUrl: "/monitor/online/batchForceLogout"
operatorType: 1
params: {}
remark: null
requestMethod: "POST"
searchValue: null
status: 0
title: "在线用户"
 */

// mock list
const genList = (current: number, pageSize: number) => {
  const list: any[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    list.push({
      id: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][
        i % 2
      ],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      gmtModified: new Date(),
      gmtCreate: new Date(),
    });
  }

  list.reverse();
  return list;
};

//生成100条数据
let tableList = genList(1, 100);

let d = Mock.mock({
  'data|5': [
    {
      'id|+1': 1,
    },
  ],
});

export default {
  'POST /api/system/operatelog': (req: Request, res: Response) => {
    //新增
    //tableList = tableList.filter(item => key.indexOf(item.key) === -1);
    res.send({
      success: true,
      message: '操作成功',
    });
  },
  'DELETE /api/system/operatelog': (req: Request, res: Response) => {
    const { id } = req.params;
    tableList = tableList.filter(item => id.indexOf(item.id) === -1);
    setTimeout(() => {
      res.send({
        success: true,
        message: '操作成功',
      });
    }, 2000);
  },

  'GET /api/system/operatelog/init': {
    success: true,
    data: {
      tpEvent: [
        { value: 'user_login', label: '用户登录', pinyin: '用户登录yonghudenglu' },
        { value: 'feedback', label: '问题反馈', pinyin: '问题反馈wentifankui' },
      ],
      initData: { iccid: '12345' },
    },
    message: '操作成功',
  },
  'GET /api/system/operatelog/:id': (req: Request, res: Response, u: string, b: Request) => {
    const { id } = req.params;
    // console.log(id);
    // console.log(d);
    // console.log(Mock);
    // Mock.setup({
    //     timeout: '200-600'
    // })
    res.send({
      success: true,
      message: '操作成功',
      data: d,
    });
  },
  //列表
  'GET /api/system/operatelog': (req: Request, res: Response, u: string, b: Request) => {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
      realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    // console.log(req);

    const params = parse(realUrl, true).query;
    //拿到分页数据
    let dataSource = [...tableList].slice(((current as number) - 1) * (pageSize as number), (current as number) * (pageSize as number));

    if (params.name) {
      dataSource = dataSource.filter(data => data.name.includes(params.name || ''));
    }

    const dataList = {
      data: {
        pageNo: parseInt(`${current}`, 10) || 1,
        pageSize,
        result: dataSource,
        totalCount: tableList.length,
      },
      success: true,
      message: '操作成功',
    };

    setTimeout(() => {
      res.send(dataList);
    }, 2000);
  },
};
