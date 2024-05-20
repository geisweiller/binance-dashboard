interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="bg-button-color text-black p-4 rounded-lg font-bold hover:opacity-70"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
