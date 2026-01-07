import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../service/opencagedataApi';
import { exchangeCurrency } from '../service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return baseCurrency;
    }
    try {
      const data = await getUserInfo(coords);
      console.log(data.results[0].annotations.currency.iso_code);

      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeCurrency = createAsyncThunk(
  'currency/fetchExchangeCurrency',
  async (credentials, thunkAPI) => {
    try {
      const data = await exchangeCurrency(credentials);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
