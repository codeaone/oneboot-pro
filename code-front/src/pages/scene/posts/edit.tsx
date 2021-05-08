import React, { useEffect, useState } from 'react';
import { Form, Card, Tabs, message, Row, Col, InputNumber, Button, Input, Upload } from 'antd';
import { AppstoreOutlined, MailOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { EditForm, FormSearch } from '@/components';
import FormItem from '@/components/from/FormItem';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';

import { history } from 'umi';
const { TabPane } = Tabs;

function Example() {
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'));

  useEffect(() => {
    // const { id } = location.query;
    // if (id) {
    //   setEditorState(editData.content);
    // }
  }, []);

  //   useEffect(() => {
  //     if (modalType === 'update') {
  //       setEditorState(BraftEditor.createEditorState(postss.editData.content));
  //     } else {
  //       setEditorState(BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'));
  //     }
  //   }, [editData, modalType]);

  const handleChange = (editorState: any) => {
    console.log('=============handleChange=================');

    setEditorState(editorState);
  };

  const uploadHandler = (param: any) => {
    if (!param.file) {
      return false;
    }

    setEditorState(
      ContentUtils.insertMedias(editorState, [
        {
          type: 'IMAGE',
          url: URL.createObjectURL,
        },
      ]),
    );
  };

  const loadImageAsync = (url: string) => {
    return new Promise(function(resolve, reject) {
      const image = new Image();

      image.onload = function() {
        resolve(image);
      };

      image.onerror = function() {
        reject(new Error('Could not load image at ' + url));
      };

      image.src = url;
    });
  };

  // 上传多张图片时，应该返回一个列表或者,分
  const handleUploadChange = (info: any) => {
    let fileList = info.fileList;
    // console.log(fileList);
    // 在此处需要看状态，如果token存在就
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      //上传成功 目前这样只能是单个文件，当有多个文件时，需要在此处处理
      let fileTokens = fileList.map((file: any) => file.response.fileView);
      //返回多个文件token
      if (fileList.length == 1) {
        fileTokens = fileTokens[0];
      } else {
        fileTokens = fileTokens[fileList.length - 1];
      }
      // console.log(fileTokens);

      loadImageAsync(fileTokens).then((res: any) => {
        // console.log('w', res.width);
        // console.log('h', res.height);

        setEditorState(
          ContentUtils.insertMedias(editorState, [
            {
              type: 'IMAGE',
              url: fileTokens,
              width: res.width / 2,
              height: res.height / 2,
            },
          ]),
        );
      });

      // this.setState({ fileTokens: fileTokens });

      // onChange.call(this, fileTokens);
    }
  };

  const callback = (key: any) => {
    switch (key) {
      case 'back':
        history.push('/scene/posts');
        break;

      default:
        break;
    }
  };

  const handleFinish = (data: any) => {
    const submitData = data;
    submitData.content = editorState.toHTML(); // or values.content.toHTML()
    if (data.publishDate) {
      submitData.publishDate = data.publishDate.format('YYYY-MM-DD');
    }
    /* if (modalType === 'create') {
      return service.create(submitData);
    } else {
      return service.update(submitData);
    } */
  };

  const controls1 = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media'];
  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator'];
  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/*"
          action={window.path + 'upload'}
          data={{ save: true }}
          showUploadList={false}
          // customRequest={uploadHandler}
          onChange={handleUploadChange}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            {/* <Icon type="picture" theme="filled" /> */}
            <PlusCircleOutlined />
          </button>
        </Upload>
      ),
    },
  ];

  return (
    <div className="params_main">
      <Card bordered={false} className={'_context_card'}>
        <Tabs defaultActiveKey="edit" onTabClick={callback} animated={false} style={{minWidth: 700}}>
          <TabPane tab="新闻文章" key="back"></TabPane>
          <TabPane tab="编辑新闻文章" key="edit">
            <EditForm form={form} url="/api/" onFinish={handleFinish}>
              <FormItem label="标题" name="title" type="input" required/>
              <FormItem label="类型" name="type" type="select" />
              <FormItem label="发布日期" name="realName" type="datepicker" required width={120}/>
              <Form.Item label="正文">
                {/* <BraftEditor className="my-editor" value={editorState} onChange={handleChange} placeholder="请输入正文内容" /> */}
                <BraftEditor value={editorState} onChange={handleChange} placeholder="请输入正文内容" controls={controls} extendControls={extendControls} />
              </Form.Item>
            </EditForm>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default Example;
