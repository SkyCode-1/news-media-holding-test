import React from 'react';
import {StoreProvider} from '@src/app/providers/redux';
import AntdProvider from '@src/app/providers/antd/provider';

function Providers({children}: {children: React.ReactNode}) {
  return (
    <StoreProvider><AntdProvider>{children}</AntdProvider></StoreProvider>
  );
}

export default Providers;