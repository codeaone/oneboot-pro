import { Request, Response } from 'express';
export default {
  'GET /api/rule1122': { success: true, message: '操作成功', data: { recordId: 932295, bafPrice: 0.0, carNo: '浙C51003', dealType: 0 } },
  'POST /api/forms': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        success: true,
        message: '操作成功',
      });
    }, 2000);
  },
  'DELETE /api/forms': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        success: true,
        message: '操作成功',
      });
    }, 2000);
  },
  'POST /api/smstemplates': {
    success: true,
    message: '操作成功',
  },
  'GET /api/smstemplates/init': {
    success: true,
    data: {
      tpEvent: [
        { value: 'user_login', name: '用户登录', label: '用户登录', pinyin: '用户登录yonghudenglu', children: null, disabled: false },
        { value: 'feedback', name: '问题反馈', label: '问题反馈', pinyin: '问题反馈wentifankui', children: null, disabled: false },
      ],
      initData:{iccid: '12345'}
    },
    message: '操作成功',
  },
  'GET /api/smstemplates': {
    data: {
      pageNo: 1,
      pageSize: 20,
      result: [
        {
          id: 'SMS_193517309',
          tpCode: 'SMS_193517309',
          tpEvent: 'feedback',
          name: '',
          context: '尊敬的${name}，您管辖的的工程已于${duedate}有意见反馈需要处理。',
          status: '',
          memo: null,
          gmtCreate: '2020-07-03 01:09:01',
          gmtModified: '2020-07-03 01:09:01',
        },
        {
          id: 'SMS_192230717',
          tpCode: 'SMS_192230717',
          tpEvent: 'user_login',
          name: '',
          context: '您的验证码${code}，该验证码5分钟内有效，请勿泄漏于他人！',
          status: '',
          memo: null,
          gmtCreate: '2020-06-14 21:34:07',
          gmtModified: '2020-06-14 21:34:07',
        },
      ],
      totalCount: 2,
      totalPageSize: 1,
    },
    success: true,
    message: '操作成功',
  },
};
