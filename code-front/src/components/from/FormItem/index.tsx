import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import _ from 'lodash';
import { getAuth, getAuthColumn, getAuthFormItem } from '../../utils/authTool';
import { getRules } from '../../utils/formRules';
import SelectX from './Select';
import InputX from './Input';
import CascaderX from './Cascader';
import TreeSelectX from './TreeSelect';
import CheckboxX from './Checkbox';
import RadioX from './Radio';
import RangePickerX from './RangePicker';
import DatePickerX from './DatePicker';
import UploadX from './Upload';
import UploadImageX from './UploadImage';
import type { ModalType } from '../FormModal';

const { TextArea } = Input;

export type FormItemType =
  | 'rangepicker'
  | 'datepicker'
  | 'input'
  | 'text'
  | 'select'
  | 'cascader'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'upload'
  | 'uploadimage'
  | 'treeselect';

export interface FormItemXProps {
  /**  */
  useName?: string;
  /** 提交字段名 */
  name: string;
  label: string;

  style?:any;

  /** 查询场景 */
  search?: boolean;

  modalType?: ModalType;
  /** 修改时是否显示 */
  modifyDisplay?: boolean;
  /** 修改时是否显示文本 */
  modifyText?: boolean;
  /** 修改时是否不可编辑 */
  modifyDisabled?: boolean;

  required?: boolean;
  /** 表单类型 */
  type: FormItemType;

  /** 请求的URL地址 */
  url?: string;

  children?: React.ReactNode;
  /** 删除时更清晰的提示 */
  text?: string;

  /** 需要删除的ID，这里可以是多个哟 */
  id?: string;
  /** 是否检查字段值是否重复 */
  exists?: boolean;

  /** rangepicker 需要返回的字段值，不在时时间对像 */
  rangeStart?: string;
  rangeEnd?: string;
  /** 表单的值，这个在修改时会有数据 */
  formItem?: any;
  /** 表单的详细值 */
  typeOpts?: any;
  width?: any;
  max?: number;
  min?: number;
  rows?: number;
  form?: any;
  uploadType?: any;
  dataName?: any;

  initData?: any;

  rules?: any;
  ruleType?: any;

  fileLength?: number;

  extra?: string;
  defaultRange?: 'today'|'yesterday'|'first7days'|'thismonth';

  /** 删除成功后，需要再提交查询操作 */
  searchSubmit?: () => void;
  uploadCallbak?: () => void;
  onChange?: (name: string, value: any) => void;
}

const FormItemX: React.FC<FormItemXProps> = props => {
  const {
    url,
    children,
    useName,
    name,
    label,
    modalType,
    modifyDisplay = false,
    modifyDisabled = false,
    required = false,
    search = false,
    type = 'input',
    modifyText,
    rangeStart,
    rangeEnd,
    formItem = {},
    typeOpts = {},
    initData = {},
    // onChange,
    max,
    min,
    rows,
    uploadType,
    dataName,
    fileLength = 1,
    uploadCallbak = 1,
    rules,
    ruleType,
    extra,
    form,
    defaultRange,
    exists=false,
    style,
    ...fitemProps
  } = props;

  const getFormItem = () => {
    
    // let typeOpts;
    // if (typeOpts) {
    //   typeOpts = JSON.parse(JSON.stringify(typeOpts));
    // }
    // if (!typeOpts) {
    //   typeOpts = {};
    // }
    if (modalType === 'update') {
      if (modifyDisabled) {
        typeOpts.disabled = true;
      }
    }

    let placeholder = `请输入${label}`;
    if (placeholder) {
      placeholder = placeholder;
    }
    let itemOpts = { ...typeOpts };

    // if (width) {
    //   itemOpts = { style: { width: width }, ...itemOpts };
    // }

    switch (type) {
      case 'input':
        return <InputX {...typeOpts} placeholder={placeholder}  />;

      case 'select':
        return <SelectX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} />;

      case 'rangepicker':
      return <RangePickerX placeholder={placeholder} name={name} rangeStart={rangeStart} rangeEnd={rangeEnd} form={form} search={search} defaultRange={defaultRange}/>;

      case 'cascader':
        // return transformCascaderX(props, typeOpts);
        // let itOptsc = { ...itemOpts };
        return <CascaderX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} />;
      case 'number':
        placeholder = `请输入${label}`;
        return <InputNumber max={max} min={min} placeholder={placeholder} {...typeOpts}/>;
      case 'checkbox':
        placeholder = `请选择${label}`;
        return <CheckboxX typeOpts={typeOpts} initData={initData} typeName={name} form={form} search={search} placeholder={placeholder} />;
      case 'radio':
        placeholder = `请选择${label}`;
        let radioOpts = { ...itemOpts };
        radioOpts.typeName = name;
        if (dataName) {
          radioOpts.typeName = dataName;
        }
        return <RadioX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} style={style}/>;

      case 'datepicker':
        console.log(typeOpts);
        
        return <DatePickerX typeOpts={typeOpts} initData={initData} typeName={name} form={form} search={search} placeholder={placeholder} />;
      case 'textarea':
        placeholder = `请输入${label}`;
        let { rows } = props;
        return <TextArea rows={rows} placeholder={placeholder} {...typeOpts}/>;
      case 'upload':
        const uploadxFileprops = {
          action: window.path + 'upload',
          multiple: false,
          onChange: uploadCallbak,
          data: { type: uploadType },
          showUploadList: false,
          accept: '',
          //   ...uploadProps,
        };
        return <UploadX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} />;

      case 'uploadimage':
        return <UploadImageX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} fileLength={fileLength} />;

      case 'treeselect':
        return <TreeSelectX typeOpts={typeOpts} initData={initData} typeName={name} search={search} placeholder={placeholder} />;

      default:
        return <InputX typeName={name} typeOpts={typeOpts} placeholder={placeholder} />;
    }
  };


  const renderInitValueToText = (_intValue: any) => {
    if (type === 'select') {
      if (!initData) {
        return _intValue;
      }
      if (!initData[name]) {
        return _intValue;
      }
      // 获取汉字
      var _obj = _.find(initData[name], o => o.value === _intValue) || {};
      return _obj.name || _intValue;
    } else {
      return _intValue;
    }
  };

  const renderInitValue = () => {
    // TODO 待实现
    return formItem[name];
    // return 'test';
  };

  // 是否显示Item
  let display = getAuthFormItem(name, useName);
  if (display) {
    if (modalType === 'update') {
      display = modifyDisplay;
    }
  }

  //是否为文本
  let isText:any = type === 'text';
  if (modalType === 'update') {
    isText = modifyText;
  }

  // 格式化数据值
  const dateFormat = 'YYYY-MM-DD';

  let hidden_fields = [];
  
  switch (type) {
    case 'rangepicker':
      hidden_fields.push(
        <Form.Item name={rangeStart} style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>,
      );
      hidden_fields.push(
        <Form.Item name={rangeEnd} style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>,
      );
      break;

    /* case 'uploadimage':
        itemvaluePropName="fileList";
        itemgetValueFromEvent=normFile; */
    default:
      break;
  }

  let itemProps = {};

  const _intValue = renderInitValue();

  const rulesProps = {
    required,
    exists,
    modalType,
    rules,
    ruleType,
    label,
    formItem,
    name,
    url
  }

  console.log(typeOpts);
  

  return display ? (
    <>
      <Form.Item {...fitemProps} {...itemProps} name={name} label={label} rules={getRules(rulesProps)} extra={extra}>
        {isText ? renderInitValueToText(_intValue) : getFormItem()}
      </Form.Item>
      {hidden_fields}
    </>
  ) : (
    <span />
  );
};

export default FormItemX;
