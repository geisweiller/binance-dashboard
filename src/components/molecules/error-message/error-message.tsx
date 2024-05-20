import { Atoms } from "../..";

interface ErrorMessageProps {
  error: string;
  retryConnection: () => void;
}

function ErrorMessage({ error, retryConnection }: ErrorMessageProps) {
  return (
    <div className="flex flex-col w-[100vw] items-center justify-center h-full gap-10 px-2">
      <p className="font-bold text-3xl">
        Something went wrong, please try again.
      </p>
      <p className="font-bold text-2xl">
        If the error persists, please contact suport and show the error message
        below.
      </p>
      <p>Error: {error}</p>
      <Atoms.Button onClick={retryConnection}>Retry connection</Atoms.Button>
    </div>
  );
}

export default ErrorMessage;
