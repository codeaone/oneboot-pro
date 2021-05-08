import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

export type UploadXProps = {
  initData?: any;

  typeName: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;

  onChange?: (value: any | undefined) => void;

  fileLength?: number;
};

// 文件上传，也可以上传图片，但如果需要展示图片，那么就使用UploadImage组件来操作吧

const UploadX: React.FC<UploadXProps> = ({ initData = {}, typeName, search = false, typeOpts = {}, placeholder, fileLength = 1, ...restProps }) => {
  const [fileList, updateFileList] = useState<UploadFile[]>([]);
  const props = {
    fileList,
    name: 'file',
    action: window.path + '/upload',

    beforeUpload: (file: UploadFile) => {
      // 文件上传是有许多安全问题的，所以需要在前端与后端一起进行控制
      // if (file.type !== 'image/png') {
      //   message.error(`${file.name} is not a png file`);
      // }
      // return file.type === 'image/png';
      return true;
    },
    onChange: (info: UploadChangeParam) => {
      console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter(file => !!file.status));

      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功。`);
        //上传成功 目前这样只能是单个文件，当有多个文件时，需要在此处处理
        let fileTokens = info.fileList.map(file => file.response.fileToken);
        //返回多个文件token
        if (fileList.length == 1) {
          fileTokens = fileTokens[0];
        } else {
          fileTokens = fileTokens.join(',');
        }
        // 当然这里也可以直接使用URL地址也行。不使用token文件
        // 需要回传数据
        console.log(fileTokens);
        console.log(restProps);
        console.log(typeName);

        if (restProps.onChange) {
          restProps.onChange(fileTokens);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败。`);
      }
    },
  };

  return (
    <>
      <Upload {...props}>{fileList.length >= fileLength ? null : <Button icon={<UploadOutlined />}>点击上传文件</Button>}</Upload>
    </>
  );
};

export default UploadX;
