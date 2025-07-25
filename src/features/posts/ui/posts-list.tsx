import React, {useCallback, useMemo, useState} from 'react';
import {useGetPostsQuery} from '@src/features/posts/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton, Spin} from 'antd';
import PostsAlert from '@src/features/posts/ui/posts-alert';
import { PostItem } from '@src/entities/post/ui';

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
            <PostItem key={item.id} post={item} />
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default PostsList;