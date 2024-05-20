import { CRYPTOCURRENCIES } from "../constants/crypto-currencies";

const WEBSOCKET_URL = "wss://stream.binance.com:9443/ws";

let wsConnections: WebSocket[] = [];

export const connectWebSockets = ({
  onMessage,
  onError,
  onConnect,
}: {
  onMessage: ({
    symbol,
    currentPrice,
  }: {
    symbol: string;
    currentPrice: number;
  }) => void;
  onError: (symbol: string, error: Event) => void;
  onConnect: (symbol: string) => void;
}) => {
  wsConnections = CRYPTOCURRENCIES.map((symbol) => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/${symbol}@ticker`);

    ws.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
      onConnect(symbol);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage({
        symbol,
        currentPrice: parseFloat(data.c),
      });
    };

    ws.onerror = (event) => {
      if (ws.readyState === WebSocket.OPEN) {
        onError(symbol, event);
      }
    };

    return ws;
  });
};

export const closeWebSockets = () => {
  wsConnections.forEach((ws) => ws.close());
};
