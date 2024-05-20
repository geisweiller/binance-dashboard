import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrice, setError, clearError } from "../store/reducer";
import { connectWebSockets, closeWebSockets } from "../services/api";

const useCryptoWebSocket = () => {
  const dispatch = useDispatch();
  const [shouldRetry, setShouldRetry] = useState(false);

  const handleMessage = useCallback(
    ({ symbol, currentPrice }: { symbol: string; currentPrice: number }) => {
      dispatch(updatePrice({ symbol, currentPrice }));
    },
    [dispatch]
  );

  const handleError = useCallback(
    (symbol: string, event: Event) => {
      dispatch(setError(`WebSocket error for ${symbol}: ${event.type}`));
    },
    [dispatch]
  );

  const handleConnect = useCallback(
    (symbol: string) => {
      dispatch(clearError());
      console.log(`Successfully connected to WebSocket for ${symbol}`);
    },
    [dispatch]
  );

  const connect = useCallback(() => {
    connectWebSockets({
      onMessage: handleMessage,
      onError: handleError,
      onConnect: handleConnect,
    });
  }, [handleMessage, handleError, handleConnect]);

  useEffect(() => {
    connect();

    return () => {
      closeWebSockets();
    };
  }, [connect, shouldRetry]);

  const retryConnection = () => {
    setShouldRetry((prev) => !prev);
  };

  return { retryConnection };
};

export default useCryptoWebSocket;
