"use client";

import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

import { cn } from "utils/utils";

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      "mb-5 flex h-14 w-full min-w-max items-center gap-1 rounded-md bg-secondary/40 p-3 shadow-lg",
      className,
    )}
    {...props}
  />
));
Toolbar.displayName = ToolbarPrimitive.Root.displayName;

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button ref={ref} className={cn(className)} {...props} />
));
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("mx-[10px] h-full w-[1px] bg-secondary/20", className)}
    {...props}
  />
));
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

const ToobarToggleItem = ToolbarPrimitive.ToggleItem;
const ToolbarGroup = ToolbarPrimitive.ToggleGroup;
const ToolbarLink = ToolbarPrimitive.Link;

export {
  Toolbar,
  ToobarToggleItem,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarButton,
};
