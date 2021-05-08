/** 在这里做一些全局的mock数据配置 */

/**
 * 获取当前用户信息
 * 做一些网络异常信息处理
 * 一些服务段数据格式异常处理
 * 业务异常处理
 * 上面这些应该放在error里面去吧？
 */

/**
  * 一个正常的数据结构
  * success: true,
    message: '操作成功',
    data: {}
  */
import { Request, Response } from 'express';

export default {
  'GET /api/global/current/user': {
    success: true,
    message: '操作成功',
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userId: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    },
  },
  //这里要处理下数据格式
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    console.log(req.body);
    
    if (password === 'admin' && username === 'admin') {
      res.send({
        success: true,
        message: '操作成功',
        data: {},
      });
      return;
    }
    if (password === 'admin' && username === 'user') {
      res.send({
        success: true,
        message: '操作成功',
        data: {},
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        success: true,
        message: '操作成功',
        data: {},
      });
      return;
    }

    res.send({
      success: false,
      message: '用户名或密码错误！',
      data: {},
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ success: true, message: '操作成功', data: {} });
  },
};
