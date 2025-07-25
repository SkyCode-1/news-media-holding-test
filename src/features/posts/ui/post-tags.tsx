import React, {memo} from 'react';
import {Flex, Tag} from 'antd';
import {PostTagsProps} from './types';

function PostTags({tags}: PostTagsProps) {
  return (
    <Flex style={{overflowX: 'auto'}}>
      {tags.map((el) => (<Tag key={el}>{el}</Tag>))}
    </Flex>
  );
}

export default memo(PostTags);