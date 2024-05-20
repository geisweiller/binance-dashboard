import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CRYPTOCURRENCIES } from "../constants/crypto-currencies";
import { CryptoState } from "../types/reducer.types";

// Estado inicial do reducer
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
    // Reducer para atualizar o preço de uma criptomoeda
    updatePrice: (
      state,
      action: PayloadAction<{ symbol: string; currentPrice: number }>
    ) => {
      const { symbol, currentPrice } = action.payload;
      state.prices[symbol] = currentPrice;

      // Define o preço inicial se ainda não estiver definido
      if (!state.initialPrices[symbol]) {
        state.initialPrices[symbol] = currentPrice;
      }

      // Se todos os preços iniciais foram definidos, desativa o estado de loading
      if (Object.keys(state.prices).length === CRYPTOCURRENCIES.length) {
        state.loading = false;
      }

      // Calcula a mudança percentual e atualiza no estado
      const initialPrice = state.initialPrices[symbol];
      state.percentChanges[symbol] = initialPrice
        ? ((currentPrice - initialPrice) / initialPrice) * 100
        : 0;
    },
    // Recducer para definir uma mensagem de erro
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Reucer para limpar a mensagem de erro
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { updatePrice, setError, clearError } = cryptoSlice.actions;

export default cryptoSlice.reducer;
