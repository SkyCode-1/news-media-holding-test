import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {Post} from '@src/entities/post';

interface GetNewsArgs {
    page: number;
    skip: number;
}

const PostsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (build) => ({
    getPosts: build.query<Post[], GetNewsArgs>({
      query: ({ page, skip }) => `posts?limit=${page}&skip=${skip}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          currentCache.articles = newItems.articles;
        } else {
          currentCache.articles.push(...newItems.articles);
        }
        currentCache.totalResults = newItems.totalResults; // Обновляем общее количество
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  })
});

export const a = PostsApi.endpoints;