import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkAPI) => {
    try {
      const data = await getUserInfo(coords);
      console.log(data.results[0].annotations.currency.iso_code);

      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
