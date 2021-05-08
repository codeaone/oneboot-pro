import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import request from '@/utils/request';
import { history } from 'umi';
import qs from 'qs';
import './test.less';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

function Example() {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState<{
    value?: string | undefined;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({
    value: undefined,
  });

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);

    if (event.target.value) {
      setUsername({
        value: event.target.value,
        validateStatus: 'success',
        errorMsg: null,
      });
    } else {
      setUsername({
        value: undefined,
        validateStatus: 'error',
        errorMsg: '请输入手机号/用户名!',
      });
    }
  };

  const inputRef = React.useRef<any>(null);

  const onFinish = (values: any) => {
    console.log('Success:', values);

    if (!username.value) {
      setUsername({
        value: undefined,
        validateStatus: 'error',
        errorMsg: '请输入手机号/用户名!',
      });
      inputRef.current!.focus({
        cursor: 'start',
      });
      return;
    }

    //在这里要处理密码加密
    // request('/api/login/account', {  body: qs.stringify(values) }).then((res: any) => {
    request.post('/api/login/account', { body: qs.stringify(values) }).then((res: any) => {
      setLoading(true);
      if (!res.success) {
        // message.error(res.message);
        inputRef.current!.focus({
          preventScroll: true,
        });
        setLoading(false);

        setUsername({
          value: username.value,
          validateStatus: 'error',
          errorMsg: res.message,
        });
      } else {
        //message.success('登录成功！');
        history.push('/');
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    if (!username.value) {
      setUsername({
        value: undefined,
        validateStatus: 'error',
        errorMsg: '请输入手机号/用户名!',
      });
      inputRef.current!.focus({
        cursor: 'start',
      });
    }
  };

  useEffect(() => {
    inputRef.current!.focus({
      cursor: 'start',
    });
  }, []);

  return (
    <div className="login-container">
      <div className="media-login-wrap">
        <h1 className="login-title">“多规合一”空间信息管理平台</h1>
        <div className="main-box">
          <div className="main-left-logo">
            <img src="/logo.jpg" alt="" />
          </div>
          <div className="main-right-form">
            <h2 className="welcome">欢迎您，请登录！</h2>
            <Form size="large" name="basic" initialValues={{ remember: true }} onFinishFailed={onFinishFailed} onFinish={onFinish}>
              <Form.Item name="username" validateStatus={username.validateStatus} help={username.errorMsg}>
                <Input
                  ref={inputRef}
                  value={username.value}
                  onChange={onUsernameChange}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入手机号/用户名"
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="请输入密码"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
