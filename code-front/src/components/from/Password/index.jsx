import React, {useState } from 'react';
import {Form, Input, Modal, message,Alert,Popover,Progress} from 'antd';
import request from '@/utils/request';
import qs from 'qs';
import styles from './style.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
var testP = {
  regex: {
    illegal: /[^-+=|,0-9a-zA-Z!@#$%^&*?_.~+\/\\(){}\[\]<>]/,
    allNumber: /^\d+$/,
    allLetter: /^[a-zA-Z]+$/,
    allCharacter: /^[-+=|,!@#$%^&*?_.~+\/\\(){}\[\]<>]+$/,
    allSame: /^([\s\S])\1*$/,
    upperLetter: /[A-Z]/,
    lowerLetter: /[a-z]/,
    number: /\d/g,
    character: /[-+=|,!@#$%^&*?_.~+\/\\()|{}\[\]<>]/
  },
  score: function(e) {
    var t = 0;
    if (this.isIllegal(e)) return t;
    var n = this.size(e);
    n <= 4 ? t += 5 : n > 4 && n < 8 ? t += 10 : n >= 8 && (t += 25);
    var r = this.hasLowerAndUpperLetter(e),
      o = this.hasLetter(e);
    r ? t += 20 : o && (t += 10);
    var i = this.hasNumber(e);
    i >= 3 ? t += 20 : i && (t += 10);
    var s = this.hasCharacter(e);
    return s >= 3 ? t += 25 : s && (t += 10), r && i && s ? t += 10 : o && i && s ? t += 5 : (o && i || o && s || i && s) && (t += 2), t
  },
  level: function(e) {
    return Math.floor(this.score(e) / 10)
  },
  size: function(e) {
    return e.length
  },
  isIllegal: function(e) {
    return !!e.match(this.regex.illegal)
  },
  isAllNumber: function(e) {
    return !!e.match(this.regex.allNumber)
  },
  isAllLetter: function(e) {
    return !!e.match(this.regex.allLetter)
  },
  isAllSame: function(e) {
    return !!e.match(this.regex.allSame)
  },
  hasNumber: function(e) {
    return (e.match(this.regex.number) || []).length
  },
  hasLetter: function(e) {
    return !!e.match(this.regex.lowerLetter) || !!e.match(this.regex.upperLetter)
  },
  hasLowerAndUpperLetter: function(e) {
    return !!e.match(this.regex.lowerLetter) && !!e.match(this.regex.upperLetter)
  },
  hasNumberAndLetter: function(e) {
    return !(!e.match(this.regex.number) || !e.match(this.regex.lowerLetter) && !e.match(this.regexp.upperLetter))
  },
  hasCharacter: function(e) {
    return (e.match(this.regex.character) || []).length
  }
}
const  ModifyPassModel = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [popvisible, setPopvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  const showModelHandler = (e) => {
    if (e)
      e.stopPropagation();
    setVisible(true);
  };

  const  hideModelHandler = (e) => {
    setPopvisible(false);
    props.hideModelHandler();
  };

  const okHandler = async () => {

    try {
        const values = await form.validateFields();
        // console.log('Success:', values);
        setConfirmLoading(true);
        // 没有配置走默认
        request('api/global/password/modify', {
          method: 'post',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: qs.stringify(values),
        }).then((data) => {
            // console.log(data);
            setConfirmLoading(false);
          if (data && !data.success) {
            message.error(data.resultView);
          } else {
            props.hideModelHandler();
            message.info('修改密码成功！');
            // window.location.href = window.path + "logout"
          }
        });
      } catch (errorInfo) {
        // console.log('Failed:', errorInfo);
      }

    // const {resetPassword} = props;
    // await  form.validateFields((err, values) => {
    //   if (!err) {
    //     if(resetPassword){
    //       return resetPassword(values,props.hideModelHandler)
    //     }
       

    //   }
    // });
  };

  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码必须一致!');
    } else {
      callback();
    }
  }


  const checkConfirm = (rule, value) => {

    if (!value) {
      return Promise.resolve();
    }

    if(value.length < 8){
        return Promise.reject("密码至少8位以上")
      }
      if(testP.isIllegal(value)){
        return Promise.reject("密码不能含有特殊符号")
      }
      if(!testP.hasNumber(value)){
        return Promise.reject("密码必须包含数字")
      }
      if(!testP.hasCharacter(value)){
        return Promise.reject("密码必须包含特殊字符如：@#¥%……&*")
      }
      if(!testP.hasLowerAndUpperLetter(value)){
        return Promise.reject("密码必须包含大小写字母")
      }
      
      if(!(!!(testP.hasNumber(value) && testP.hasLetter(value) || testP.hasNumber(value) && testP.hasCharacter(value) || testP.hasLetter(value) && testP.hasCharacter(value)))){
        return Promise.reject("密码设置不符合要求，应包含数字大小写字母")
      }

      return Promise.resolve();

  };



    const  checkConfirm1 = (rule, value, callback) => {

    if (!value) {
        setPopvisible(!!value);
      return callback();
    }

    if (!popvisible) {
        setPopvisible(!!value);
    }
    if(value.length < 8){
      return callback("密码至少8位以上")
    }
    if(testP.isIllegal(value)){
      return callback("密码不能含有特殊符号")
    }
    if(!testP.hasNumber(value)){
      return callback("密码必须包含数字")
    }
    if(!testP.hasCharacter(value)){
      return callback("密码必须包含特殊字符如：@#¥%……&*")
    }
    if(!testP.hasLowerAndUpperLetter(value)){
      return callback("密码必须包含大小写字母")
    }
    
    if(!(!!(testP.hasNumber(value) && testP.hasLetter(value) || testP.hasNumber(value) && testP.hasCharacter(value) || testP.hasLetter(value) && testP.hasCharacter(value)))){
      return callback("密码设置不符合要求，应包含数字大小写字母")
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }

    setPopvisible(false);
    // return callback();
    return Promise.resolve();
  }
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };
  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
  }
  const renderPasswordProgress = () => {
    // console.log("================");
    
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    // console.log(passwordStatus);
    
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const {children,isNeedResetPassword} = props;
    const modalOpts = {
      title: '修改密码',
      visible: props.visible,
      confirmLoading:confirmLoading,
      onOk: okHandler,
      closable:!isNeedResetPassword,
      maskClosable:true,
      cancelButtonProps: { disabled: isNeedResetPassword },
      onCancel: hideModelHandler,
      destroyOnClose:true
    };
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        }
      }
    };

    
    return (
      <span>
        <span onClick={showModelHandler}>
          {children}
        </span>

        <Modal {...modalOpts} forceRender={true} maskClosable={false}>
          {isNeedResetPassword?<><Alert message="首次登陆需要修改初始密码" type="warning" showIcon /><br/></>:null}
          <Form layout="horizontal" form={form}>
            <FormItem {...formItemLayout} name="oldpassword" label="旧密码" rules={[{ required: true, message: '请输入旧的登录密码!' }]} hasFeedback>
            <Input.Password />
            </FormItem>

            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    请至少输入 8 个字符。包含字母大小写+数字+特殊字符。

                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={false}
            //   visible={popvisible}
            >
            <FormItem {...formItemLayout} name="password" label="新密码" 
            rules={[{ required: true, message: '请输入登录密码!' },
            {validator: checkConfirm}]} hasFeedback extra="请至少输入 8 个字符。包含字母大小写+数字+特殊字符！">
              <Input.Password />
            </FormItem>
            </Popover>
            
            <FormItem {...formItemLayout} name="confirm" label="确认新密码"  dependencies={['password']}
            rules={[{ required: true, message: '请两次输入新密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致!');
              },
            }),]} hasFeedback>
              <Input.Password onBlur={handleConfirmBlur} />
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
}

export default ModifyPassModel;
