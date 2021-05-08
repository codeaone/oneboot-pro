import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form } from 'antd';
import { EditForm,FormSearch } from '@/components';
import FormItem from '@/components/from/FormItem';
import request from '@/utils/request';
import ReactMarkdown from 'react-markdown';
import markdata from './util';

import './index.less';


function Example() {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({});

  useEffect(()=>{
    request.get('/static/doc/tween-one.md').then(d => {
      console.log(d);
      const jsonML = markdata(d.data.mdata);
      //console.log(getChildren(jsonML.content));
      setContent(jsonML.content);
      setMeta(jsonML.meta);
    })
  },[]);

  return (
    <div>
      <EditForm form={form} url="/api/">
        <FormItem label="登录名称" name="name" type="input" />
        <FormItem label="用户状态" name="state" type="select" />
        <FormItem label="用户姓名" name="realName" type="input" />
      </EditForm>
    </div>
  );
}

export default Example;
