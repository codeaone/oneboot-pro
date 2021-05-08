import React from 'react';
import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/es/select';
import { GeographicItemType } from '../data.d';
import styles from './index.less';
import provinceData from '../data/province';
import cityData from '../data/city';
import _ from 'lodash';

const { Option } = Select;

export type SecurityProps = {
  province?: GeographicItemType[];
  city?: GeographicItemType[];
  value?: {
    province: LabeledValue;
    city: LabeledValue;
  };
  loading?: boolean;
  onChange?: (value: string) => void;
};

const Security: React.FC<SecurityProps> = ({ value, onChange, loading = false }) => {
  const [cityList, setCityList] = React.useState<GeographicItemType[]>([]);
  const [province, setProvince] = React.useState('');
  const [city, setCity] = React.useState('');

  const handleProvinceChange = (value: any) => {
    console.log(value);

    // const cityObj = cityData[value];
    const cityObj: GeographicItemType[] = _.get(cityData, value);
    console.log(cityObj);

    setCityList(cityObj);
    setCity(cityObj[0].id);
    setProvince(value);

    if (onChange) {
      onChange(`${value}/${cityObj[0].id}`);
    }
  };


  const selectCityItem = (value: string) => {
    setCity(value);
    if (onChange) {
      onChange(`${province}/${value}`);
    }
  };

  return (
    <>
      <Spin spinning={loading} wrapperClassName={styles.row}>
        <Select className={styles.item} value={province} onChange={handleProvinceChange}>
          {provinceData.map(province => (
            <Option key={province.id} value={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
        <Select className={styles.item} value={city} onChange={selectCityItem}>
          {cityList.map((city: GeographicItemType) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
      </Spin>
    </>
  );
};

export default Security;
