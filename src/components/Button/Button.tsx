import { MouseEventHandler } from "react";

const Button = ({ children, onClick }: { children: JSX.Element | JSX.Element[]; onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button onClick={onClick} className="flex h-min items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200">
      {children}
    </button>
  );
};

export default Button;
