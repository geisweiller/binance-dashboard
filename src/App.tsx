import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice, setError } from "./redux/reducer";
import { AppDispatch, RootState } from "./redux/store";
import { connectWebSockets, closeWebSockets } from "./services/api";
import { CRYPTOCURRENCIES } from "./constants/crypto-currencies";
import CoinLogo from "./components/coin-logo/icon";

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col w-[100vw] items-center justify-center h-full gap-10">
      <h1 className="text-3xl font-bold">Market Overview</h1>
      <div className="border border-border-color rounded-lg p-4 ">
        <div className="grid grid-cols-3 items-center font-bold text-sm border-b border-border-color pb-4">
          <p>Name</p>
          <p className="text-center">Price</p>
          <p className="text-right">Change</p>
        </div>

        <ul className="mt-4">
          {CRYPTOCURRENCIES.map((symbol) => {
            const coin = symbol.slice(0, -4);
            const currency = symbol.slice(-4);
            const name = `${coin.toUpperCase()}/${currency.toUpperCase()}`;

            const price = prices[symbol];

            const percentage = calculatePercentageChange(
              initialPrices[symbol],
              prices[symbol]
            );

            const isPostive = Math.sign(percentage) === 1;

            return (
              <li
                key={symbol}
                className="grid grid-cols-3 gap-10 py-2 text-md font-bold"
              >
                <span className="flex gap-2">
                  <CoinLogo symbol={symbol} />
                  {name.toUpperCase()}
                </span>
                <span className="text-center">${price.toFixed(2)}</span>
                <span
                  className={`text-right  ${
                    isPostive ? "text-buy-color" : "text-sell-color"
                  }`}
                >
                  {percentage.toFixed(2)}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
