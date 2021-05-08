import React, { useState, useEffect } from 'react';
import { Form, Card, Tabs, message, Row, Col, InputNumber, Button, Input, Upload } from 'antd';
import DataTree from './components/datatree';
import ViewCode from './components/viewcode';
import { history } from 'umi';
import request from '@/utils/request';
const { TabPane } = Tabs;

const restUrl = '/api/unstable/factory';

function Example() {
  const [codeMap, setCodeMap] = useState([]);
  const [activeKey, setActiveKey] = useState('edit');
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    request.get('/api/unstable/factory/precode').then((res: any) => {
      const cm = res.data || [];
      setCodeMap(cm);
      if (cm.length > 0) {
        setActiveKey(cm[0].name);
      }
    });
  };

  //在这里需要去后台加载数据，返回后并且显示
  const callback = (key: any) => {
    switch (key) {
      case 'back':
        history.push('/unstable/factory');
        break;

      default:
        break;
    }
    setActiveKey(key);
  };
  //这里tab会有很多个的呀
  return (
    <Card bordered={false} className={'_context_card'}>
      <Tabs activeKey={activeKey} onTabClick={callback} animated={false} style={{ minWidth: 700 }}>
        <TabPane tab="返回" key="back"></TabPane>
        {codeMap.map((code: any) => {
          return (
            <TabPane tab={code.name} key={code.name}>
              <ViewCode language={code.language} codeString={code.code} />
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
}

export default Example;
