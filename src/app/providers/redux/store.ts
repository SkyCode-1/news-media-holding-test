import { configureStore } from '@reduxjs/toolkit';
import {postsStoreConfiguration} from '@src/features/posts';

export const store = configureStore({
  reducer: {
    ...postsStoreConfiguration.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsStoreConfiguration.middleware),
});