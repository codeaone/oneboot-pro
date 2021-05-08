import React, { useState, useEffect } from 'react';
import { Card, message, Row, Col } from 'antd';
import DataTree from './components/datatree';
import EditCard from './components/editcard';

const restUrl = '/api/system/resource';

function Example() {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <DataTree />
        </Card>
      </Col>
      <Col span={18}>
        <Card bordered={false} className={'_context_card'}>
          <EditCard />
        </Card>
      </Col>
    </Row>
  );
}

export default Example;
