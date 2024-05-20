import { Atoms, Molecules } from "../..";
import { CRYPTOCURRENCIES } from "../../../constants/crypto-currencies";
import { PriceData } from "../../../types/reducer.types";

interface ListProps {
  prices: PriceData;
  loading: boolean;
  percentChanges: PriceData;
}

function List({ prices, loading, percentChanges }: ListProps) {
  return (
    <ul className="mt-4 flex flex-col justify-center">
      {CRYPTOCURRENCIES.map((symbol) => {
        const coin = symbol.slice(0, -4);
        const currency = symbol.slice(-4);
        const name = `${coin.toUpperCase()}/${currency.toUpperCase()}`;

        const price = prices[symbol];

        if (loading) {
          return <Atoms.Skeleton key={symbol} />;
        }

        return (
          <Molecules.ListItem
            key={symbol}
            symbol={symbol}
            name={name}
            percent={percentChanges[symbol]}
            price={price}
          />
        );
      })}
    </ul>
  );
}

export default List;
