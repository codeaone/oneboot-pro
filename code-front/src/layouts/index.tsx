import React, { useState, useEffect } from 'react';
import { IRouteComponentProps,Redirect } from 'umi'
import customMenuDate from '../menu';
import BasicLayout from '@/components/layout/BasicLayout';
import request from '@/utils/request';

function Layout({ children, location, route, history, match }: IRouteComponentProps) {

  function onPageChange(location: any) {
    console.log(location);

  }

  console.log(location.pathname);
  
  console.log(location.pathname.indexOf('login')>0);
  console.log(location.pathname.indexOf('login'));
  





  if (location.pathname.indexOf('login')>0) {
    return <div>{ children }</div>
  } else if (location.pathname.indexOf('bigscreen')>0) {
    return <div>{ children }</div>
  } else {
    // // 需要在这里发起查询用户请求
    // request.get('/api/global/current/user').then((res:any)=>{
    //   // console.log(res);
    //   if(!res.success) {
    //     ///login/test
    //     history.push('/login/test');
    //     return <Redirect to="/login/test" />;
    //   }
    // })
  }

  return (<BasicLayout index="/scene/crud" title="OneBoot-PRO" logo={'/static/home_logo.png'}  key="basic" menus={customMenuDate} >
    {children}
  </BasicLayout>)
};

export default Layout;