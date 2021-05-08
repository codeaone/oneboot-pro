// 一个标准的mock, 就是一个完整的CRUD操作
import { Request, Response } from 'express';
import Mock from 'mockjs';

//创建一个内存DB
import db, { post, deleteObj, patch, get, getList } from '../../../components/utils/mockTool';

//在这里需要做下自动成功动作
//在做mock时，其实就是把系统详情的设计完成了，后续只要按照这个逻辑
// 主要是一些实际的数据，和状态与操作

//需要定义出所有的状态值，一些取值空间
// Mock 请参考：http://mockjs.com/examples.html

const tableName = 'unstablefactory';

const state = [
  { value: '1', label: '正常', pinyin: '正常' },
  { value: '2', label: '锁定', pinyin: '锁定' },
];
const itemType = [
  { value: 'input', label: '输入框', pinyin: '输入框' },
  { value: 'select', label: '选择框', pinyin: '选择框' },
];
const itemRule = [
  { value: 'required', label: '必选项', pinyin: '输入框' },
  { value: 'email', label: '邮箱地址', pinyin: '选择框' },
  { value: 'mobile', label: '手机号码', pinyin: '选择框' },
];
const config = [
  { value: 'searcher', label: '查询', pinyin: '查询' },
  { value: 'searcherLike', label: '模糊查询', pinyin: '模糊查询' },
  { value: 'add', label: '新增', pinyin: '新增' },
  { value: 'update', label: '修改', pinyin: '修改' },
  { value: 'listView', label: '显示', pinyin: '显示' },
  { value: 'exists', label: 'exists', pinyin: 'exists' },
  { value: 'modifyDisabled', label: '禁止编辑', pinyin: '禁止编辑' },
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
db.defaults({ unstablefactory: d.data }).write();

function genData(body: any) {
  let m = Mock.mock(temp);
  m.gmtCreate = Mock.mock('@now');
  return { ...m, ...body };
}

export default {
  'POST /api/unstable/factory': (req: Request, res: Response) => {
    //新增
    post(res, genData(req.body), tableName);
  },
  //删除数据
  'DELETE /api/unstable/factory/:id': (req: Request, res: Response) => {
    deleteObj(res, req.params, tableName);
  },
  //修改数据
  'PATCH /api/unstable/factory/:id': (req: Request, res: Response) => {
    patch(res, req.params, req.body, tableName);
  },
  //初始化数据
  'GET /api/unstable/factory/init': {
    success: true,
    data: {
      state: state,
      itemType: itemType,
      itemRule: itemRule,
      config: config,
      initData: { state: '1' },
    },
    message: '操作成功',
  },
  'GET /api/unstable/factory/precode': {
    success: true,
    data: [
      {
        name: 'Service.java',
        language: 'java',
        code: `
        /**
        * @author  开启异步配置在配置类中添加注解@EnableAsync
        */
       @SpringBootApplication
       @EnableAsync
       public class CodeFactoryAppStart {
       
           public static void main(String[] args) {
               SpringApplication.run(CodeFactoryAppStart.class, args);
           }
       
       }`,
      },
      {
        name: 'index.tsx',
        language: 'javascript',
        code: `
        interface Item {
          key: string;
          name: string;
          age: string;
          address: string;
        }
        
        interface EditableRowProps {
          index: number;
        }
        `,
      },
    ],

    message: '操作成功',
  },
  //查看详情
  'GET /api/unstable/factory/:id': (req: Request, res: Response) => {
    // const { id } = req.params;
    get(res, req.params, tableName);
  },
  //编辑时返回
  'GET /api/unstable/factory/:id/edit': (req: Request, res: Response) => {
    get(res, req.params, tableName);
  },
  //列表
  'GET /api/unstable/factory': (req: Request, res: Response) => {
    getList(req, res, tableName);
  },
};
