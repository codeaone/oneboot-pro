import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import type { OneFieldFC } from '../index';

export interface OneUploadProps {
  initData?: any;

  typeName: string;

  onChange?: (name: string, value: any | undefined) => void;
}

/**
 * 输入框
 * @param props
 */
const OneUpload: OneFieldFC<OneUploadProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, initData,typeName='', ...restProps } = props;
  const [fileList, updateFileList] = useState<UploadFile[]>([]);
  const _props = {
    fileList,
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    beforeUpload: (file: UploadFile) => {
      // 文件上传是有许多安全问题的，所以需要在前端与后端一起进行控制
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === 'image/png';
    },
    onChange: (info: UploadChangeParam) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        //上传成功 目前这样只能是单个文件，当有多个文件时，需要在此处处理
        let fileTokens = fileList.map(file => file.response.fileToken);
        //返回多个文件token
        if (fileList.length == 1) {
          fileTokens = fileTokens[0];
        }
        // 当然这里也可以直接使用URL地址也行。不使用token文件
        // 需要回传数据
        if (restProps.onChange) {
          restProps.onChange(typeName, fileTokens);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }

      console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter(file => !!file.status));
    },
  };

  return (
    <>
      <Upload {..._props}>
        <Button icon={<UploadOutlined />}>点击上传文件</Button>
      </Upload>
    </>
  );
};


OneUpload.displayName = 'OneUpload';

export default React.forwardRef(OneUpload);
