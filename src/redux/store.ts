import { configureStore } from '@reduxjs/toolkit';
import { ThumbnailSlice } from './slices/ThumbnailSlice';
import { ImageSlice } from './slices/ImageSlice';

export const store = configureStore({
  reducer: {
    Thumbnail: ThumbnailSlice.reducer,
    Image: ImageSlice.reducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
