export interface PriceData {
  [key: string]: number;
}

export interface CryptoState {
  prices: PriceData;
  initialPrices: PriceData;
  percentChanges: PriceData;
  loading: boolean;
  error: string | null;
}
