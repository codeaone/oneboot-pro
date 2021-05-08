import React from 'react';
import { Checkbox } from 'antd';
import _ from 'lodash';

export type CheckboxXProps = {
  initData?: any;

  typeName: string;
  value?: any;

  /** 查询场景 */
  search?: boolean;
  noLabel?: boolean;

  /** SelectProps */
  typeOpts?: any;
  form: any;

  placeholder?: string;
  onChange?: (value: string | undefined) => void;
};

const CheckboxX: React.FC<CheckboxXProps> = ({
  onChange,
  initData = {},
  typeName,
  value,
  noLabel = false,
  search = false,
  typeOpts = {},
  placeholder,
  form,
  ...restProps
}) => {
  let options = [];
  if (initData[typeName] instanceof Array) {
    options = initData[typeName];
  }

  const handleChange = (value: any) => {
    console.log(value);

    if (onChange) {
      // 只要上面的更新就可以了，这里是否会有问题呢，后续再来看下
      // onChange(value);
    }

    // debugger
    if (value && form) {
      let values = {};
      _.set(values, typeName, _.join(value, ','));
      // console.log(values);
      form.setFieldsValue(values);
    }
  };

  let checkedList = value;
  console.log(checkedList);
  debugger;
  if (checkedList instanceof String || typeof checkedList === 'string') {
    checkedList = _.split(value, ',');
    console.log(checkedList);
  }
  //value={checkedList}

  return (
    <>
      {noLabel ? (
        <Checkbox style={{ paddingRight: 30 }} checked={value} onChange={onChange} {...restProps} />
      ) : (
        <Checkbox.Group options={options} value={checkedList} onChange={handleChange} {...restProps} />
      )}
    </>
  );
};

export default CheckboxX;
