import { createSelector } from '@reduxjs/toolkit';

export const selectBaseCurrency = state => state.currency.baseCurrency;

export const selectExcangeInfo = state => state.currency.exchangeInfo;
export const selectIsLoading = state => state.currency.isLoading;
export const selectIsError = state => state.currency.isError;

export const selectRates = state => state.currency.rates;
export const selectFilteredRates = createSelector(
  [selectRates, selectBaseCurrency],
  (rates, baseCurrency) => {
    console.log('rates in selectFilteredRates: ', rates);

    return rates
      .filter(([key]) => key !== baseCurrency)
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);
