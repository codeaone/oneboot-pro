import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FormInstance, FormItemProps } from 'antd/lib/form';
// import { Input } from '@/components/field';
// import _ from 'lodash';

export interface FormItemXProps extends FormItemProps {
  initData?: any;

  typeName: string;

  /** 查询场景 */
  search?: boolean;

  /** SelectProps */
  typeOpts?: any;

  placeholder?: string;
}

/**
 *
 * @param props
 */
const FormItem: React.FC<FormItemXProps> = props => {
  //这样写会更清晰一些
  const { children, search, typeOpts, name, placeholder, initData, typeName, ...restProps } = props;

  const _children = React.Children.map(children, (child: any, i) => {
    // console.log(child);
    // if (typeof child.type == 'function') {
    //   console.log(child.type.name);
    //   // 只针对x节点做处理
    //   // if ('FormItemx' === child.type.name) {
    //   return {
    //     ...child,
    //     props: {
    //       typeName:name,
    //       ...child.props,
    //     },
    //   };
    //   // } else {
    //   //   return child;
    //   //   // 这里还需要考虑多层
    //   // }
    // } else {
    //   return child;
    // }
    return {
      ...child,
      props: {
        typeName:name,
        ...child.props,
      },
    };
  });
  
  return (
    <Form.Item name={name} {...restProps}>
      {_children[0]}
    </Form.Item>
  );
};

FormItem.defaultProps = {
  search: false,
};

FormItem.displayName = 'FormItem';

export default FormItem;
