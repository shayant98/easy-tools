import { ChangeEvent } from "react";

const Input = ({ value, onChange, title, placeholder, showTitle = true }: InputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {showTitle && <label htmlFor={title}>{title}</label>}
      <input value={value} onChange={onChange} className="bg-gray-100  h-10 outline-none px-2 rounded text-xs text-black w-full" placeholder={placeholder ?? title} />
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  showTitle?: boolean;
  placeholder?: string;
}

export default Input;
