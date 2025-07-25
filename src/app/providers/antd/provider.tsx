import React from 'react';
import {ConfigProvider} from 'antd';

function AntdProvider({children}: {children: React.ReactNode}) {
  return (
    <ConfigProvider>{children}</ConfigProvider>
  );
}

export default AntdProvider;