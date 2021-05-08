# umi project

## 请查阅官方文档
https://zh-hans.reactjs.org/docs/hooks-intro.html
https://ant-design.gitee.io/components/table-cn/
https://umijs.org/zh-CN/docs
https://bizcharts.net/
https://ahooks.js.org/zh-CN/hooks/async



## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

npm install -g serve

# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist

本框架中，全采用16.8以上版本中Hook的方式来实现，做到函数式编程

实现删除功能，实现新增与修改功能
实现FromItem组件抽取基础实现
做一个完整的组件示例

需要使用uim框架中的路由方式，不用手动去配置 https://umijs.org/zh-CN/docs/convention-routing
布局处理好，分模块+菜单 --o
个人信息模块 --o
修改密码，第一次强制修改密码
修改校验规则
多做几个登录页面，需要处理密码加密传输（需要服务端配合）
实现下微信扫码关注登录的功能（暂时使用流量王这个服务号）
实现数据字典功能
实现系统参数功能
实现POST请求幂等功能
处理下全局网络请求所遇到的问题（非200失败，无权限，无会话）
定制下antd全局的一些变量

只使用uim，不依赖antd-pro,pro-layout,pro-table,pro-list,pro-from等一系列官方出品的组件，全都要自己定制好，并且与服务端紧密结合
处理上传，下载功能
处理文件导入，导出场景解决方案

本框架是专门为全栈工程师量身定制的，在接下来使用过程中你会发现，他与后端的交互是如此的顺滑。

目录结构：
models 放置model数据，如何使用请查阅 dva框架文档
services 放置请求服务器的请求函数，在一个正常的CRUD中，组件已经包括了与服务端的交互，那么什么时候需要使用这此目录呢，还需要进一步来讨论下。

所有的组件，必须使用ts来实现，具体的业务实现，使用js来实现。因为使用js会少写许多的代码。
而在全栈工程中，主要的接口定义与模型的设计还在后端，其实也是同一人实现。那么只要一份代码即可
组件是需要在业务各处使用的，所以强制要求使用ts来实现，极致发恢ts的优势

所有的共用组件，统一放在components目录存放。

关于样式：

目录结构
```js
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts

```

## 样式定制
https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less


## 服务请求方案：
https://umijs.org/zh-CN/plugins/plugin-request#userequest


