import {store} from './store.ts'

declare type RootState = ReturnType<typeof store.getState>;
declare type AppDispatch = typeof store.dispatch;