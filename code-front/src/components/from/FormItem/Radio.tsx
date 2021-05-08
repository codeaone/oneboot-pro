import React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export type RadioXProps = {
  initData?: any;

  typeName: string;

  value?: any;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;
  onChange?: (name: string, value: string | undefined) => void;
  style?: any;
};

const RadioX: React.FC<RadioXProps> = ({ onChange, initData = {}, value, typeName, style, search = false, typeOpts = {}, placeholder, ...restProps }) => {
  const renderRadio = () => {
    let options = [];
    if (initData[typeName] instanceof Array) {
      options = initData[typeName];
    }
    if (style === 'button') {
      return options.map((opt: { value: string | number | null | undefined; name: any }) => (
        <RadioButton key={opt.value} value={opt.value}>
          {opt.name}
        </RadioButton>
      ));
    }
    return options.map((opt: { value: string | number | null | undefined; name: any }) => (
      <Radio key={opt.value} value={opt.value}>
        {opt.name}
      </Radio>
    ));
  };

  return (
    <>
      <RadioGroup onChange={onChange} value={value+""} {...restProps}>
        {renderRadio()}
      </RadioGroup>
    </>
  );
};

export default RadioX;
