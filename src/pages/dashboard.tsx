import { useSelector } from "react-redux";
import { Molecules, Organisms } from "../components";

import { RootState } from "../store/store";
import useCryptoWebSocket from "../hooks/use-crypto";

function Dashboard() {
  const { prices, loading, error, percentChanges } = useSelector(
    (state: RootState) => state.crypto
  );
  const { retryConnection } = useCryptoWebSocket();

  if (!!error) {
    return (
      <Molecules.ErrorMessage error={error} retryConnection={retryConnection} />
    );
  }

  return (
    <div className="flex flex-col gap-20">
      <Molecules.Header />
      <div className="flex flex-col w-[100vw] items-center h-full gap-10 px-2">
        <h1 className="text-3xl font-bold">Market Overview</h1>
        <div className="border border-border-color rounded-lg p-4 w-full max-w-[1000px]">
          <div className="grid grid-cols-3 items-center font-bold text-sm border-b border-border-color pb-4">
            <p className="text-lg">Name</p>
            <p className="text-lg text-right">Price</p>
            <p className="text-lg text-right">Change</p>
          </div>

          <Organisms.List
            prices={prices}
            loading={loading}
            percentChanges={percentChanges}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
