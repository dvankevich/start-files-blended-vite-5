import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filter',
  initialState: { currency: '' },
  reducers: {
    setFilter(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { setFilter } = slice.actions;
export const filterReducer = slice.reducer;
