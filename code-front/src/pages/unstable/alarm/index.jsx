import { Form, Button } from 'antd';
import { Input, Select, Checkbox ,Radio} from '@/components/field';
import FormItem from '@/components/formitem';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const data = {
  tpEvent: [
    { value: 'user_login', name: '用户登录', label: '用户登录', pinyin: '用户登录yonghudenglu', children: null, disabled: false },
    { value: 'feedback', name: '问题反馈', label: '问题反馈', pinyin: '问题反馈wentifankui', children: null, disabled: false },
  ],
  checkbox: [
    { value: 'user_login', name: '用户登录', label: '用户登录', pinyin: '用户登录yonghudenglu', children: null, disabled: false },
    { value: 'feedback', name: '问题反馈', label: '问题反馈', pinyin: '问题反馈wentifankui', children: null, disabled: false },
  ],
  radio: [
    { value: 'user_login', name: '用户登录', label: '用户登录', pinyin: '用户登录yonghudenglu', children: null, disabled: false },
    { value: 'feedback', name: '问题反馈', label: '问题反馈', pinyin: '问题反馈wentifankui', children: null, disabled: false },
  ],
  initData: { iccid: '12345' },
};

const Demo = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormItem
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </FormItem>

      <FormItem
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </FormItem>

      <FormItem label="Select" name="tpEvent">
        <Select initData={data} />
      </FormItem>

      <FormItem label="Checkbox" name="checkbox">
        <Checkbox group initData={data} />
      </FormItem>
      <FormItem label="Radio" name="radio">
        <Radio  initData={data} />
      </FormItem>

      <FormItem {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox >Remember me</Checkbox>
      </FormItem>

      <FormItem {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default Demo;
