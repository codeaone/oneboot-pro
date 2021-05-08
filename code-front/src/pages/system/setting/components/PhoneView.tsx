import React from 'react';
import { Input } from 'antd';

import styles from './index.less';

export type PhoneViewProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const PhoneView: React.FC<PhoneViewProps> = ({ value, onChange }) => {
  let values = ['', ''];
  if (value) {
    values = value.split('-');
  }
  return (
    <>
      <Input
        className={styles.area_code}
        value={values[0]}
        onChange={e => {
          if (onChange) {
            onChange(`${e.target.value}-${values[1]}`);
          }
        }}
      />
      <Input
        className={styles.phone_number}
        onChange={e => {
          if (onChange) {
            onChange(`${values[0]}-${e.target.value}`);
          }
        }}
        value={values[1]}
      />
    </>
  );
};

export default PhoneView;
