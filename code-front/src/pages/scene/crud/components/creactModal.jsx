import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';

const restUrl = '/api/smstemplates';

function CreactModal(props: any) {
  const { children, modalType } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="趋势图" form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="ICCID" name="iccid" type="input" modifyText />
        <FormItem label="卡片类型" name="tpEvent" type="select" required />
        <FormItem label="号牌号码" name="carNo" type="input" required />
        <FormItem label="查询时段" name="range" type="rangepicker" extra="这是一个时间段查询" rangeStart="start" rangeEnd="end" />
      </FormModal>
    </>
  );
}

export default CreactModal;
