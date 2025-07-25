import postsApi from './api';

export const postsStoreConfiguration = {
  middleware: postsApi.middleware,
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer
  },
};

export type * from './types';
export * from './api';
