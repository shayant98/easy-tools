"use client";

import { cn } from "@utils/utils";
import { type LucideIcon, XCircle } from "lucide-react";
import { type ChangeEvent, forwardRef, type InputHTMLAttributes } from "react";
import { type IconType } from "react-icons";

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, showClear, icon: Icon, shortcutIcon: SCIcon, ...props }, ref) => {
  // Clear the input value
  const handleClearInput = () => {
    if (props.onChange) props.onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  // Focus the input element
  const setInputFocus = () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={setInputFocus}
      className="group flex items-center rounded  border border-slate-300 bg-transparent text-xs text-slate-800 group-focus:outline-none group-focus:ring-2 group-focus:ring-slate-400   group-focus:ring-offset-2 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
    >
      {Icon && <Icon size={16} className="ml-2 " />}
      <input
        ref={ref}
        {...props}
        className={cn(
          className,
          "h-10  w-full rounded bg-transparent px-2 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 group-focus:bg-white  dark:text-slate-50"
        )}
      />
      {props.value && showClear && <XCircle onClick={handleClearInput} size={32} className=" mr-1 h-4 w-4 cursor-pointer   rounded  px-2 py-2 duration-200 hover:bg-gray-400" />}
      {!props.value && SCIcon && (
        <div className="mr-1 whitespace-nowrap rounded-sm bg-slate-300 px-2 py-1 shadow-lg dark:bg-gray-700">
          <small>{SCIcon}</small>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showClear?: boolean;
  icon?: IconType | LucideIcon;
  shortcutIcon?: string;
}

export default Input;
