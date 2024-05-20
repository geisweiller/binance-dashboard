import { CRYPTOCURRENCIES } from "../constants/crypto-currencies";

const WEBSOCKET_URL = "wss://stream.binance.com:9443/ws";

let wsConnections: WebSocket[] = [];

// Função para conectar aos WebSockets para cada criptomoeda
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
  // Cria conexões WebSocket para cada criptomoeda listada em CRYPTOCURRENCIES
  wsConnections = CRYPTOCURRENCIES.map((symbol) => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/${symbol}@ticker`);

    // Evento disparado quando a conexão WebSocket é aberta com sucesso
    ws.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
      onConnect(symbol);
    };

    // Evento disparado quando uma mensagem é recebida pelo WebSocket
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage({
        symbol,
        currentPrice: parseFloat(data.c),
      });
    };

    // Evento disparado quando ocorre um erro na conexão WebSocket
    ws.onerror = (event) => {
      if (ws.readyState === WebSocket.OPEN) {
        onError(symbol, event);
      }
    };

    return ws;
  });
};

// Função para fechar todas as conexões WebSocket
export const closeWebSockets = () => {
  wsConnections.forEach((ws) => ws.close());
};
