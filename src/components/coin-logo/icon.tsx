import { BtcIcon, DogeIcon, EthIcon, SolIcon } from "../../assets";

function CoinLogo({ symbol }: { symbol: string }) {
  const renderSymbol = (symbol: string) => {
    switch (symbol) {
      case "btcusdt":
        return {
          src: BtcIcon,
          alt: "BTC-logo",
        };
      case "ethusdt":
        return {
          src: EthIcon,
          alt: "ETH-logo",
        };
      case "solusdt":
        return {
          src: SolIcon,
          alt: "SOL-logo",
        };
      case "dogeusdt":
        return {
          src: DogeIcon,
          alt: "DOGE-logo",
        };

      default:
        return {
          src: "",
          alt: "",
        };
        break;
    }
  };

  return (
    <img
      src={renderSymbol(symbol).src}
      alt={renderSymbol(symbol).alt}
      width={40}
      height={40}
    />
  );
}

export default CoinLogo;
