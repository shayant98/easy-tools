import { type LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "utils/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  trailing?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon: Icon, trailing: Trailing, ...props }, ref) => {
  return (
    <div
      className={cn(
        "group flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mr-4" />}
      <input type={type} className={cn("w-full bg-inherit outline-none ")} ref={ref} {...props} />
      {Trailing && <div className="ml-4">{Trailing}</div>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
