import React, {useCallback, useMemo, useState} from 'react';
import {useGetPostsQuery} from '@src/features/posts/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton, Spin, Typography} from 'antd';
import {DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import IconText from '@src/shared/ui/icon-text/component';
import PostTags from './post-tags';
import PostsAlert from '@src/features/posts/ui/posts-alert';

function PostsList() {
  const [skip, setSkip] = useState(0);
  const {data, isLoading, error, refetch} = useGetPostsQuery({skip});
  const hasMore = useMemo(() => Boolean(data?.posts && data?.posts?.length < (data?.total || 0)), [data]);

  const loadMoreData = useCallback(() => {
    if (isLoading || !hasMore || error) {
      return;
    }
    setSkip(prevState => prevState + 1);
  }, [isLoading, hasMore, error]);

  if (error) {
    return (
      <PostsAlert refetch={refetch}/>
    );
  }

  if (!data || isLoading && skip === 0) {
    return <Spin spinning fullscreen tip="Загрузка постов... :)" />;
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <InfiniteScroll
        dataLength={data.posts.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton title paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>Больше нечего грузить XD</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout={'vertical'}
          dataSource={data.posts}
          renderItem={(item) => (
            <List.Item key={item.id} actions={[
              <IconText icon={LikeOutlined} text={String(item.reactions.likes)} key="list-vertical-like-o" />,
              <IconText icon={DislikeOutlined} text={String(item.reactions.dislikes)} key="list-vertical-star-o" />,
            ]}>
              <List.Item.Meta
                style={{width:'100%'}}
                title={<Typography.Title ellipsis={{rows: 1}}>{item.title}</Typography.Title>}
                description={<PostTags tags={item.tags} />}
              />
              <Typography.Paragraph ellipsis={{ rows: 3, expandable: false } }>
                {item.body}
              </Typography.Paragraph>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default PostsList;