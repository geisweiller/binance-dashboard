import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrice, setError, clearError } from "../store/reducer";
import { connectWebSockets, closeWebSockets } from "../services/api";

const useCryptoWebSocket = () => {
  const dispatch = useDispatch();
  const [shouldRetry, setShouldRetry] = useState(false);

  // Função para lidar com mensagens recebidas via WebSocket
  const handleMessage = useCallback(
    ({ symbol, currentPrice }: { symbol: string; currentPrice: number }) => {
      dispatch(updatePrice({ symbol, currentPrice }));
    },
    [dispatch]
  );

  // Função para lidar com erros de conexão do WebSocket
  const handleError = useCallback(
    (symbol: string, event: Event) => {
      dispatch(setError(`WebSocket error for ${symbol}: ${event.type}`));
    },
    [dispatch]
  );

  // Função para lidar com a conexão bem-sucedida do WebSocket
  const handleConnect = useCallback(
    (symbol: string) => {
      dispatch(clearError());
      console.log(`Successfully connected to WebSocket for ${symbol}`);
    },
    [dispatch]
  );

  // Função para iniciar a conexão dos WebSockets
  const connect = useCallback(() => {
    connectWebSockets({
      onMessage: handleMessage,
      onError: handleError,
      onConnect: handleConnect,
    });
  }, [handleMessage, handleError, handleConnect]);

  // Efeito para gerenciar a conexão e desconexão dos WebSockets
  useEffect(() => {
    connect();

    // Fecha os WebSockets na desmontagem do componente
    return () => {
      closeWebSockets();
    };
  }, [connect, shouldRetry]);

  // Função para tentar reconectar os WebSockets
  // Alterna o estado shouldRetry para forçar a reconexão
  const retryConnection = () => {
    setShouldRetry((prev) => !prev);
  };

  // Retorna a função de retry para ser usada no componente
  return { retryConnection };
};

export default useCryptoWebSocket;
