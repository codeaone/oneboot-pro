import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd/lib/select';
const Option = Select.Option;

export type FormItemProps = {
  initData?: any;

  typeName: string;
  value?: any;

  /** 查询场景 */
  search: boolean;

  /** SelectProps */
  typeOpts?:any;

  placeholder: string;

}

const FormItem: React.FC<FormItemProps> = ({typeName, value,initData,search=false, children,placeholder, typeOpts={} , ...restProps}) => {
  const renderOptionType =()=> {
    // console.log("renderOptionType");
    
    // console.log(initData);
    
    if (initData[typeName] instanceof Array) {
      let dataType = [];
      if (search) {
        dataType = [
          {
            label: '所有',
            pinyin: 'all',
            value: 'all',
          },
          ...initData[typeName],
        ];
      } else {
        dataType = initData[typeName];
      }
// console.log(dataType);

      return dataType.map((type: { value: string; pinyin: string; label: React.ReactNode; }) => (
        <Option key={type.value} pinyin={type.pinyin} value={type.value}>
          {type.label}
        </Option>
      ));
    }
  }
  //// onChange={this.handleChange}
  return (
    <Select
          style={{ width: '100%', minWidth: '120px' }}
          value={value ? value+"": ""}
          placeholder={placeholder}
          showSearch
          optionFilterProp="pinyin"
          notFoundContent="无法找到"
          allowClear
          {...typeOpts}
          {...restProps}
        >
          {renderOptionType()}
        </Select>
  );
};

export default FormItem;
