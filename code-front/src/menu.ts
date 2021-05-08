export default [
  {
    path: '/unstable',
    name: '实验功能',
    icon: 'crown',
    children: [
      {
        path: '/unstable/temp1',
        name: '一张图',
        icon: 'smile',
      },
      {
        path: '/unstable/alarm',
        name: 'alarm',
        icon: 'smile',
      },
      {
        path: '/unstable/projects',
        name: '项目',
        icon: 'smile',
      },
      {
        path: '/unstable/factory',
        name: 'factory',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/scene',
    name: '常用场景',
    icon: 'crown',
    children: [
      {
        path: '/scene/monitor',
        name: '地图监测',
        icon: 'smile',
      },
      {
        path: '/scene/crud',
        name: 'CRUD',
        icon: 'smile',
      },
      {
        path: '/scene/posts',
        name: '文章管理',
        icon: 'smile',
      },
      {
        path: '/scene/complaint1',
        name: '投诉记录',
        icon: 'smile',
        children: [
          {
            path: '/scene/monitor/outline112',
            name: '地图监测',
            icon: 'smile',
          },
          {
            path: '/scene/alarm112',
            name: '报警记录',
            icon: 'smile',
          },
          {
            path: '/scene/complaint112',
            name: '投诉记录',
            icon: 'smile',
          },
        ],
      },
    ],
  },
  {
    path: '/cloudall',
    name: '微服务',
    icon: 'crown',
    children: [
      {
        path: '/cloudall/monitor',
        name: '地图监测',
        icon: 'smile',
      },
      {
        path: '/cloudall/alarm',
        name: '报警记录',
        icon: 'smile',
      },
      {
        path: '/cloudall/complaint',
        name: '投诉记录',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/upcard',
    name: '流量卡平台',
    icon: 'crown',
    children: [
      {
        path: '/upcard/monitor',
        name: '地图监测',
        icon: 'smile',
      },
      {
        path: '/upcard/alarm',
        name: '报警记录',
        icon: 'smile',
      },
      {
        path: '/upcard/overview',
        name: '运营概览',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/smsprod',
    name: '短信平台',
    icon: 'crown',
    children: [
      {
        path: '/smsprod/monitor',
        name: '地图监测',
        icon: 'smile',
      },
      {
        path: '/smsprod/alarm',
        name: '报警记录',
        icon: 'smile',
      },
      {
        path: '/smsprod/overview',
        name: '运营概览',
        icon: 'smile',
      },
    ],
  },

  {
    name: '系统管理',
    icon: 'table',
    path: '/system',
    children: [
      {
        path: '/system/dictionary',
        name: '数据字典',
        icon: 'smile',
      },
      {
        path: '/system/resource',
        name: '权限资源',
        icon: 'smile',
      },
      {
        path: '/system/dept',
        name: '部门管理',
        icon: 'smile',
      },
      {
        path: '/system/post',
        name: '职务管理',
        icon: 'smile',
      },
      {
        path: '/system/role',
        name: '系统角色',
        icon: 'smile',
      },
      {
        path: '/system/params',
        name: '系统配置',
        icon: 'smile',
      },
      {
        path: '/system/monitor',
        name: '系统监控',
        icon: 'smile',
        children: [
          {
            path: '/system/monitor/online',
            name: '在线用户',
            icon: 'smile',
          },
          {
            path: '/system/monitor/operatelog',
            name: '操作日志',
            icon: 'smile',
          },
          {
            path: '/system/monitor/loginlog',
            name: '登录日志',
            icon: 'smile',
          },
          {
            path: '/system/monitor/job',
            name: '定时任务',
            icon: 'smile',
          },
          {
            path: '/system/monitor/cache',
            name: '缓存监控',
            icon: 'smile',
          },
          {
            path: '/system/monitor/data',
            name: '数据监控',
            icon: 'smile',
          },
          {
            path: '/system/monitor/server',
            name: '服务监控',
            icon: 'smile',
          },
          {
            path: '/system/monitor/slowreq',
            name: '慢请求记录',
            icon: 'smile',
          },
          {
            path: '/system/monitor/dbbackup',
            name: '数据库备份',
            icon: 'smile',
          },
        ],
      },
      {
        path: '/system/tool',
        name: '系统工具',
        icon: 'smile',
        children: [
          {
            path: '/system/tool/interface',
            name: '系统接口',
            icon: 'smile',
          },
          {
            path: '/system/tool/optdoc',
            name: '操作文档',
            icon: 'smile',
          },
        ],
      },
    ],
  },

  {
    path: '/login',
    name: 'login',
    hidded: true,
    children: [
      {
        path: '/login/test',
        name: 'test',
        hidded: true,
      },
    ],
  },
];
