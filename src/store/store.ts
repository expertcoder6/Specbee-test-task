import { configureStore } from '@reduxjs/toolkit';
import NewsSlice from './NewsSlice/NewsSlice';

export const store = configureStore({
  reducer: {
    news: NewsSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
