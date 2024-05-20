import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CRYPTOCURRENCIES } from "../constants/crypto-currencies";
import { CryptoState } from "../types/reducer.types";

const initialState: CryptoState = {
  prices: {},
  initialPrices: {},
  percentChanges: {},
  loading: true,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updatePrice: (
      state,
      action: PayloadAction<{ symbol: string; currentPrice: number }>
    ) => {
      const { symbol, currentPrice } = action.payload;
      state.prices[symbol] = currentPrice;
      if (!state.initialPrices[symbol]) {
        state.initialPrices[symbol] = currentPrice;
      }
      if (Object.keys(state.prices).length === CRYPTOCURRENCIES.length) {
        state.loading = false;
      }

      const initialPrice = state.initialPrices[symbol];
      state.percentChanges[symbol] = initialPrice
        ? ((currentPrice - initialPrice) / initialPrice) * 100
        : 0;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { updatePrice, setError, clearError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
