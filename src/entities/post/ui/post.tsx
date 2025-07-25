import React, { memo } from 'react';
import IconText from '@src/shared/ui/icon-text/component';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import PostTags from './post-tags';
import { PostProps } from './types';

function Post({ post }: PostProps) {
  return (
    <List.Item key={post.id} actions={[
      <IconText icon={LikeOutlined} text={String(post.reactions.likes)} key="list-vertical-like-o" />,
      <IconText icon={DislikeOutlined} text={String(post.reactions.dislikes)} key="list-vertical-star-o" />
    ]}>
      <List.Item.Meta
        style={{ width: '100%' }}
        title={<Typography.Title ellipsis={{ rows: 1 }}>{post.title}</Typography.Title>}
        description={<PostTags tags={post.tags} />}
      />
      <Typography.Paragraph ellipsis={{ rows: 3, expandable: false }}>
        {post.body}
      </Typography.Paragraph>
    </List.Item>
  );
}

export default memo(Post);