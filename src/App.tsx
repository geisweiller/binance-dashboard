import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice, setError } from "./store/reducer";
import { AppDispatch, RootState } from "./store/store";
import { connectWebSockets, closeWebSockets } from "./services/api";
import { CRYPTOCURRENCIES } from "./constants/crypto-currencies";

import { ListItem, Skeleton } from "./components";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { prices, initialPrices, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    connectWebSockets({
      onMessage: ({ symbol, currentPrice }) => {
        dispatch(updatePrice({ symbol, currentPrice }));
      },
      onError: (symbol, event) => {
        dispatch(setError(`WebSocket error for ${symbol}: ${event.type}`));
      },
    });

    return () => {
      closeWebSockets();
    };
  }, []);

  const calculatePercentageChange = (
    initial: number | undefined,
    current: number | undefined
  ) => {
    if (initial === undefined || current === undefined) return 0;
    return ((current - initial) / initial) * 100;
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col w-[100vw] items-center justify-center h-full gap-10 px-2">
      <h1 className="text-3xl font-bold">Market Overview</h1>
      <div className="border border-border-color rounded-lg p-4 w-full max-w-[1000px]">
        <div className="grid grid-cols-3 items-center font-bold text-sm border-b border-border-color pb-4">
          <p>Name</p>
          <p className="text-right">Price</p>
          <p className="text-right">Change</p>
        </div>

        <ul className="mt-4 flex flex-col justify-center">
          {CRYPTOCURRENCIES.map((symbol) => {
            const coin = symbol.slice(0, -4);
            const currency = symbol.slice(-4);
            const name = `${coin.toUpperCase()}/${currency.toUpperCase()}`;

            const price = prices[symbol];

            const percentage = calculatePercentageChange(
              initialPrices[symbol],
              prices[symbol]
            );

            if (loading) {
              return <Skeleton />;
            }

            return (
              <ListItem
                symbol={symbol}
                name={name}
                percentage={percentage}
                price={price}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
