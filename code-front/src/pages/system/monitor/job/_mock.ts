// 一个标准的mock, 就是一个完整的CRUD操作
import { Request, Response } from 'express';
import Mock from 'mockjs';

//创建一个内存DB
import db, { post, deleteObj, patch, get, getList } from '../../../../components/utils/mockTool';

//在这里需要做下自动成功动作
//在做mock时，其实就是把系统详情的设计完成了，后续只要按照这个逻辑
// 主要是一些实际的数据，和状态与操作

//需要定义出所有的状态值，一些取值空间
// Mock 请参考：http://mockjs.com/examples.html

const tableName = 'systemjob';

const state = [
  { value: '1', label: '正常', pinyin: '正常' },
  { value: '2', label: '锁定', pinyin: '锁定' },
];

const temp = {
  id: '@id',
  'state|1': ['1', '2'],
  name: '@word',
  realName: '@cname',
  mobileNo: '@mobile',
  gmtCreate: '@datetime',
  gmtLastLogin: '@datetime',
  lastLoginIp: '@ip',
};

let d = Mock.mock({
  'data|30': [temp],
});
db.defaults({ systemjob: d.data }).write();

function genData(body: any) {
  let m = Mock.mock(temp);
  m.gmtCreate = Mock.mock('@now');
  return { ...m, ...body };
}

export default {
  'POST /api/system/job': (req: Request, res: Response) => {
    //新增
    post(res, genData(req.body), tableName);
  },
  //删除数据
  'DELETE /api/system/job/:id': (req: Request, res: Response) => {
    deleteObj(res, req.params, tableName);
  },
  //修改数据
  'PATCH /api/system/job/:id': (req: Request, res: Response) => {
    patch(res, req.params, req.body, tableName);
  },
  //初始化数据
  'GET /api/system/job/init': {
    success: true,
    data: {
      state: state,
      initData: { state: '1' },
    },
    message: '操作成功',
  },
  //查看详情
  'GET /api/system/job/:id': (req: Request, res: Response) => {
    // const { id } = req.params;
    get(res, req.params, tableName);
  },
  //编辑时返回
  'GET /api/system/job/:id/edit': (req: Request, res: Response) => {
    get(res, req.params, tableName);
  },
  //列表
  'GET /api/system/job': (req: Request, res: Response) => {
    getList(req, res, tableName);
  },
};
