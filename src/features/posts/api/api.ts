import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {POSTS_LIMIT} from './constants';
import type {PostsResponse, GetPostsArgs} from './types';

const postsApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),

  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, GetPostsArgs>({
      query: ({ skip }) => `posts?limit=${POSTS_LIMIT}&skip=${skip}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          currentCache.posts = newItems.posts;
        } else {
          currentCache.posts.push(...newItems.posts);
        }
        currentCache.skip = newItems.skip;
        currentCache.total = newItems.total;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },
    }),
  })
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = postsApi;

export default postsApi;