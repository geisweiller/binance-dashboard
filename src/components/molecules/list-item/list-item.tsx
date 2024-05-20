import { Atoms } from "../..";
import CryptoNames from "../../../enum/crypto";
import USDollar from "../../../utils/currency";

interface ListItemProps {
  symbol: "btcusdt" | "ethusdt" | "solusdt" | "dogeusdt";
  name: string;
  percent: number;
  price: number;
}

function ListItem({ symbol, name, percent, price }: ListItemProps) {
  const isPositive = Math.sign(percent) === 1;

  return (
    <li key={symbol} className="grid grid-cols-3 py-2 text-md font-bold">
      <span className="flex gap-2">
        <Atoms.CoinLogo symbol={symbol} />
        <div className="flex flex-col">
          <p>{name.toUpperCase()}</p>
          <p className="opacity-50"> {CryptoNames[symbol]}</p>
        </div>
      </span>
      <span className="text-right">{USDollar.format(price)}</span>
      <span
        className={`text-right  ${
          isPositive ? "text-buy-color" : "text-sell-color"
        }`}
      >
        {percent.toFixed(2)}%
      </span>
    </li>
  );
}

export default ListItem;
