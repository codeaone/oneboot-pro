import React from 'react';
import { DatePicker } from 'antd';
import type { SelectProps } from 'antd/lib/select';
import moment from 'moment';
import _ from 'lodash';

export type DatePickerXProps = {
  initData?: any;

  typeName: string;
  value?: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?:any;

  placeholder?: string;

  form: any;
  onChange?: (value: any | undefined) => void;
}

const DatePickerX: React.FC<DatePickerXProps> = ({ onChange, value, form,initData={}, typeName, search=false,typeOpts={} ,placeholder, ...restProps }) => {
  // console.log("========restProps==========");
  
  // console.log(restProps);
  
  // console.log(value);
  

  const handleChange = (value: any, timeString: string) => {
    console.log(value);
    // debugger
    console.log(timeString);
    if (value && form) {
      let values = {};
      _.set(values, typeName, timeString);
      // console.log(values);
      form.setFieldsValue(values);
    }

    if (onChange) {
      // 只要上面的更新就可以了，这里是否会有问题呢，后续再来看下
      // onChange(value);
    }
  };

  return (
    <>
      <DatePicker  onChange={handleChange} {...restProps} {...typeOpts}/>
    </>
  );
};

export default DatePickerX;
