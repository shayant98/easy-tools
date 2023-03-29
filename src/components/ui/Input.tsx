import { cn } from "@utils/utils";
import { ChangeEvent, forwardRef, useRef } from "react";
import { IconType } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, showClear, icon: Icon, shortcutIcon: SCIcon, ...props }, ref) => {
  // Clear the input value
  const handleClearInput = () => {
    if (props.onChange) props.onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  // Focus the input element
  const setInputFocus = () => {
    try {
      if (ref != null) {
        (ref as any).current.focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={setInputFocus}
      className="group flex text-xs text-slate-800  bg-transparent border dark:border-slate-700 border-slate-300 group-focus:outline-none group-focus:ring-2 group-focus:ring-slate-400 group-focus:ring-offset-2   rounded items-center dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
    >
      {Icon && <Icon size={16} className="ml-2 " />}
      <input
        ref={ref}
        {...props}
        className={cn(
          className,
          "bg-transparent  h-10 outline-none px-2 rounded placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 group-focus:bg-white text-slate-900 dark:text-slate-50  w-full"
        )}
      />
      {props.value && showClear && (
        <AiOutlineClose onClick={handleClearInput} size={32} className="mr-1 duration-200 cursor-pointer   hover:bg-gray-400  rounded h-full px-2 py-2" />
      )}
      {!props.value && SCIcon && <SCIcon size={36} className="mr-1 border text-gray-400 border-gray-400      rounded-sm h-full px-1 py-1" />}
    </div>
  );
});

Input.displayName = "Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showClear?: boolean;
  icon?: IconType;
  shortcutIcon?: IconType;
}

export default Input;
