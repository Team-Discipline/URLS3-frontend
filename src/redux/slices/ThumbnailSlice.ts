import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

export const ThumbnailSlice = createSlice({
  name: 'Thumbnail',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    url: ' '
  },

  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    storeThumbnail: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }
  }
});

export const { storeThumbnail } = ThumbnailSlice.actions;

export default ThumbnailSlice.reducer;
