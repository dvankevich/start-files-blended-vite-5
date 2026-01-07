export const selectBaseCurrency = state => state.currency.baseCurrency;

export const selectExcangeInfo = state => state.currency.exchangeInfo;
export const selectIsLoading = state => state.currency.isLoading;
export const selectIsError = state => state.currency.isError;
