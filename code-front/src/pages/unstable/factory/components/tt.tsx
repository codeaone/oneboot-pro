import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Checkbox, Tag, Row, Col, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

export type FormItemType =
  | 'datepicker'
  | 'input'
  | 'text'
  | 'select'
  | 'multiselect'
  | 'cascader'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'treeselect';

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  required?: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  option?: any[];
  type: FormItemType;
  handleSave: (record: Item) => void;
  onChange?: () => void;
}

const EditableCell: React.FC<EditableCellProps> = props => {
  const { title, editable, children, dataIndex, record, type, required = false, option = [], onChange, handleSave, ...restProps } = props;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState();
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  // useEffect(() => {
  //   if (editing && inputRef) {
  //     inputRef.current!.focus();
  //   }
  // }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);

      const value = form.getFieldValue(dataIndex);
      console.log('===========' + value);
      setValue(value);

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const renderSelectOption = () => {
    if (option instanceof Array) {
      return option.map(type => (
        <Option key={type.value} value={type.value}>
          {type.label}
        </Option>
      ));
    }
  };

  const cancel = () => {
    setEditing(false);
  };

  const renderInputItem = () => {
    console.log(onChange);

    switch (type) {
      case 'select':
        return (
          <Select ref={inputRef} onBlur={save} style={{ width: '100%' }}>
            {renderSelectOption()}
          </Select>
        );
      case 'multiselect':
        return (
          <Select ref={inputRef} mode="multiple" onBlur={save} autoFocus style={{ width: '100%', minWidth: '80px' }}>
            {renderSelectOption()}
          </Select>
        );
      case 'checkbox':
        return <Checkbox.Group options={option} onBlur={save} />;
      default:
        return <Input ref={inputRef} autoFocus onPressEnter={save} onBlur={save} />;
    }
  };

  const renderLabel = () => {
    switch (type) {
      case 'checkbox':
        var _arr: any[] = value || [];
        console.log(_arr);

        const oo = option.map(opt => {
          const i = _.findIndex(_arr, function(o) { return o === opt.value; });
          console.log(i);
          
          return (
            <span>
              {opt.label}
              {i === -1 ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
            </span>
          );
        });
        return <Space>{oo}</Space>;
      case 'select':
        var _str = value;
        if (_str) {
          var _obj = _.find(option, e => e.value === value) || {};
          console.log(_obj);

          _str = _obj.label;
        }
        return _str;
      case 'multiselect':
        var _arr: any[] = value || [];
        return _arr.map(_m => {
          var _obj = _.find(option, e => e.value === _m) || {};
          return (
            <Tag key={_obj.value} color="blue">
              {_obj.label}
            </Tag>
          );
        });
      default:
        return children;
    }
  };

  const itemRules = () => {
    let rules = [];
    if (required) {
      rules.push({
        required: true,
        message: `请输入${title}.`,
      });
    }
    return rules;
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={itemRules()}>
        {renderInputItem()}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {renderLabel()}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0] & { initData: any };



interface EditableTableState {
  dataSource: any[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
  columns: (ColumnTypes[number] & { required?: boolean; type?: FormItemType; editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: '字段',
        dataIndex: 'name',
      },
      {
        title: '页面名称',
        dataIndex: 'age',
        editable: true,
        required: true,
      },
      {
        title: '控件类型',
        dataIndex: 'itemType',
        editable: true,
        type: 'select',
        required: true,
      },
      {
        title: '校验类型',
        dataIndex: 'itemRule',
        type: 'multiselect',
        editable: true,
      },
      {
        title: '其他配置',
        dataIndex: 'config',
        type: 'checkbox',
        editable: true,
        width: '30%'
      },
      {
        title: '依赖表',
        dataIndex: 'ext2',
        editable: true,
      },
      {
        title: '数据字典',
        dataIndex: 'ext3',
        editable: true,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }

  handleSave = (row: any) => {
    console.log(row);

    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const { initData = {} } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          option: initData[col.dataIndex],
          type: col.type,
          required: col.required,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
       
        <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns as ColumnTypes} />
      </div>
    );
  }
}

export default EditableTable;
