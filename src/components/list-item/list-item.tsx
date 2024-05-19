import CryptoNames from "../../enum/crypto";
import USDollar from "../../utils/currency";
import CoinLogo from "../coin-logo/icon";

interface iListItemProps {
  symbol: "btcusdt" | "ethusdt" | "solusdt" | "dogeusdt";
  name: string;
  percentage: number;
  price: number;
}

function ListItem({ symbol, name, percentage, price }: iListItemProps) {
  const isPositive = Math.sign(percentage) === 1;

  return (
    <li key={symbol} className="grid grid-cols-3 py-2 text-md font-bold">
      <span className="flex gap-2">
        <CoinLogo symbol={symbol} />
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
        {percentage.toFixed(2)}%
      </span>
    </li>
  );
}

export default ListItem;
