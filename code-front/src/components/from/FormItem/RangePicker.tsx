import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';
// import type { RangeValue } from 'antd/lib/date-picker';

const RangePicker = DatePicker.RangePicker;

export type RangePickerProps = {
  rangeStart?: string;

  form?: any;

  rangeEnd?: string;

  name: string;

  placeholder: string;

  /** 查询场景 */
  search?: boolean;

  defaultRange?: 'today' | 'yesterday' | 'first7days' | 'thismonth';

  onChange?: (name: string, value: string | undefined) => void;
};

const RangePickerX: React.FC<RangePickerProps> = ({ children, name, onChange, rangeStart = 'start', rangeEnd = 'end', form, search = false, placeholder, defaultRange }) => {
  useEffect(() => {
    if (defaultRange) {
      // 格式化数据值
      const dateFormat = 'YYYY-MM-DD';
      let values = {};
      //就需要设置默认值咯
      switch (defaultRange) {
        case 'today':
          _.set(values, rangeStart, moment().format(dateFormat));
          _.set(values, rangeEnd, moment().format(dateFormat));
          break;
        case 'yesterday':
          _.set(
            values,
            rangeStart,
            moment()
              .add(-1, 'days')
              .format(dateFormat),
          );
          _.set(
            values,
            rangeEnd,
            moment()
              .add(-1, 'days')
              .format(dateFormat),
          );
          break;
        case 'first7days':
          _.set(
            values,
            rangeStart,
            moment()
              .add(-7, 'days')
              .format(dateFormat),
          );
          _.set(values, rangeEnd, moment().format(dateFormat));
          break;
        case 'thismonth':
          _.set(
            values,
            rangeStart,
            moment()
              .startOf('month')
              .format(dateFormat),
          );
          _.set(values, rangeEnd, moment().format(dateFormat));
          break;

        default:
          break;
      }
      form.setFieldsValue(values);
    }
  }, []);

  
  const handleChange = (value: any[], timeString: string[]) => {
    console.log(timeString);
    if (value && form && rangeStart) {
      let values = {};
      _.set(values, rangeStart, timeString[0]);
      _.set(values, rangeEnd, timeString[1]);
      _.set(values, name, '');
      console.log(values);
      form.setFieldsValue(values);
    }

    if (onChange) {
      onChange(name, undefined);
    }
  };

  const ranges = {
    今天: [moment(), moment()],
    昨天: [moment().add(-1, 'days'), moment().add(-1, 'days')],
    前7天: [moment().add(-7, 'days'), moment()],
    本月: [moment().startOf('month'), moment()],
  };

  let _props = {
    style: { width: '100%' },
  };

  if (search) {
    _props.style.width = '210px';
  }

  if (defaultRange) {
    //就需要设置默认值咯
    switch (defaultRange) {
      case 'today':
        _.set(_props, 'defaultValue', [moment(), moment()]);
        break;
      case 'yesterday':
        _.set(_props, 'defaultValue', [moment().add(-1, 'days'), moment().add(-1, 'days')]);
        break;
      case 'first7days':
        _.set(_props, 'defaultValue', [moment().add(-7, 'days'), moment()]);
        break;
      case 'thismonth':
        _.set(_props, 'defaultValue', [moment().startOf('month'), moment()]);
        break;

      default:
        break;
    }
  }

  return (
    <>
      <RangePicker onChange={handleChange} ranges={ranges} {..._props} />
    </>
  );
};

export default RangePickerX;
