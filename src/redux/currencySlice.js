import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchBaseCurrency.rejected, state => {
        state.baseCurrency = 'USD';
      }),
});

export const currencyReducer = slice.reducer;
