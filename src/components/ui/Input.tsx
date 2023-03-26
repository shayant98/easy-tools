import { ChangeEvent, useRef } from "react";
import { IconType } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const Input = ({ value, onChange, title, placeholder, showTitle = true, type = "text", showClear, icon: Icon, shortcutIcon: ShortCutIcon }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  // Focus the input element
  const setInputFocus = () => {
    try {
      inputRef.current && inputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {showTitle && <label htmlFor={title}>{title}</label>}
      <div onClick={setInputFocus} className="flex text-xs  bg-gray-500 rounded items-center">
        {Icon && <Icon size={16} className="ml-2" />}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          className="bg-gray-500   h-10 outline-none px-2 rounded  text-white w-full"
          placeholder={placeholder ?? title}
        />
        {value && showClear && <AiOutlineClose onClick={handleClearInput} size={32} className="mr-1 duration-200 cursor-pointer   hover:bg-gray-400  rounded h-full px-2 py-2" />}
        {!value && ShortCutIcon && <ShortCutIcon size={36} className="mr-2 border text-gray-400 border-gray-400      rounded h-full px-1 py-1" />}
      </div>
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  showTitle?: boolean;
  type?: string;
  placeholder?: string;
  showClear?: boolean;
  icon?: IconType;
  shortcutIcon?: IconType;
}

export default Input;
