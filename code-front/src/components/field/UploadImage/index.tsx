import React, { useState, useEffect } from 'react';
import { Upload, message, Modal, Button } from 'antd';
import type { UploadChangeParam, UploadFile,UploadFileStatus } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import type { OneFieldFC } from '../index';

export interface OneUploadImageProps  {
  initData?: any;

  typeName: string;

  value?: string;

  fileLength?: number;

  onChange?: (name: string, value: any | undefined) => void;
}

function getBase64(file: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  });
}


/**
 * 输入框
 * @param props
 */
const OneUploadImage: OneFieldFC<OneUploadImageProps> = (props,ref) => {
  //这样写会更清晰一些
  const { children,mode, initData,value,typeName='', fileLength = 1, ...restProps } = props;
  const [fileList, updateFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    if (value) {
      //需要回显数据
      const urls = value.split(',');
      const fileList:UploadFile[] = urls.map(url => {
        const file:UploadFile = {
          uid: url,
          type:'',
          name: url,
          size:0,
          status: 'done',
          url: url,
        };
        return file;
      });
      updateFileList(fileList);
    }
  }, []);

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
        let fileTokens = fileList.map(file => file.response.fileView);

        // 当然这里也可以直接使用URL地址也行。不使用token文件
        // 需要回传数据
        if (restProps.onChange) {
          restProps.onChange(typeName, fileTokens.join(','));
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }

      console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter(file => !!file.status));
    },

    onPreview: async (file: UploadFile) => {
      //这里同样需要
      if (!file.url && !file.preview) {
        if (file.originFileObj) {
          file.preview = await getBase64(file.originFileObj);
        }
      }
      // 这里还需要改一下的
      setPreviewImage(file.url || file.preview || '');
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || '');
    },
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload {..._props}>{fileList.length >= fileLength ? null : uploadButton}</Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

OneUploadImage.displayName = 'OneUploadImage';

export default React.forwardRef(OneUploadImage);
