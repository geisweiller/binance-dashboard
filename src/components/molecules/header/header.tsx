import { Button } from "../../atoms";

function Header() {
  return (
    <div className="flex w-full justify-between items-center px-6 py-4 border-border-color border-b">
      <p className="text-4xl">Binance API</p>
      <Button>Sign up</Button>
    </div>
  );
}

export default Header;
