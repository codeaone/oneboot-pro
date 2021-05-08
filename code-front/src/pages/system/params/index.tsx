import React from 'react';
import { Card, Tabs } from 'antd';
import Common from './components/common';
import Test from './components/test';
import Paymerch from './components/paymerch';
import OpenConfig from './components/openconfig';
const { TabPane } = Tabs;

function Example() {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <Card>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="通用配置" key="1">
          <Test />
        </TabPane>
        <TabPane tab="支付商户配置" key="6">
          <Paymerch />
        </TabPane>
        <TabPane tab="开放平台配置" key="2">
          <OpenConfig />
        </TabPane>
        <TabPane tab="公交线路信息" key="3">
          <Common />
        </TabPane>
        <TabPane tab="公交站信息" key="4">
          <Common />
        </TabPane>
        <TabPane tab="车辆实时GPS" key="5">
          <Common />
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default Example;
