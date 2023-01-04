import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CountrySlice = createSlice({
  name: 'Country',
  initialState: {
    countries: {}
  },
  reducers: {
    countryRefine: (state, action: PayloadAction<object>) => {
      state.countries = action.payload;
    }
  }
}
);

export const { countryRefine } = CountrySlice.actions;
