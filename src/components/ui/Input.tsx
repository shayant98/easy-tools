import { cn } from "@utils/utils";
import { ChangeEvent, forwardRef, useRef } from "react";
import { IconType } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, showClear, ...props }, ref) => {
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
    <div className="flex flex-col gap-y-2">
      {props.showTitle && <label htmlFor={props.title}>{props.title}</label>}
      <div onClick={setInputFocus} className="flex text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-500  rounded items-center">
        {props.icon && <props.icon size={16} className="ml-2 " />}
        <input ref={ref} {...props} className={cn(className, "bg-white dark:bg-slate-500  h-10 outline-none px-2 rounded  text-slate-900 dark:text-slate-100  w-full")} />
        {props.value && showClear && (
          <AiOutlineClose onClick={handleClearInput} size={32} className="mr-1 duration-200 cursor-pointer   hover:bg-gray-400  rounded h-full px-2 py-2" />
        )}
        {!props.value && props.shortcutIcon && <props.shortcutIcon size={36} className="mr-2 border text-gray-400 border-gray-400      rounded h-full px-1 py-1" />}
      </div>
    </div>
  );
});

Input.displayName = "Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  showTitle?: boolean;
  showClear?: boolean;
  icon?: IconType;
  shortcutIcon?: IconType;
}

export default Input;
