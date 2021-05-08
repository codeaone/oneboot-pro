import React from 'react';
import { Card, Tabs, Form } from 'antd';
import { EditForm,FormSearch } from '@/components';
import FormItem from '@/components/from/FormItem';
const { TabPane } = Tabs;

function Example() {
  const [form] = Form.useForm();

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
