import React, {memo} from 'react';
import {Space} from 'antd';
import {IconTextProps} from './types';

const IconText = ({ icon, text }: IconTextProps) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


export default memo(IconText);