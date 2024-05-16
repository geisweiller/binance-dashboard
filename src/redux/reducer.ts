import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CRYPTOCURRENCIES } from "../constants/crypto-currencies";

interface PriceData {
  [key: string]: number;
}

interface CryptoState {
  prices: PriceData;
  initialPrices: PriceData;
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  prices: {},
  initialPrices: {},
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
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { updatePrice, setError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
