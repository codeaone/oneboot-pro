import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  externals: {
    BMap: 'BMap',
  },
  // layout: {},
  fastRefresh: {},
  // routes: [{ path: '/', component: '@/pages/index' }],
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  // 禁用 sourcemap
  // devtool: false,
  theme: {
    // ...darkTheme,
    'card-head-height': '38px',
    'card-head-height-sm': '26px',
    'card-inner-head-padding': '6px',
    'card-head-padding': '8px',
    'card-padding-base': '12px',
    'padding-lg': '14px',
    'padding-md': '10px',
    'padding-sm': '8px',
    'layout-header-height': '48px',
  },
  //替换压缩器为 esbuild
  esbuild: {},
  //配置代理能力。
  proxy: {
    '/apitest': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
