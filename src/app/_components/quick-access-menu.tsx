"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { useEffect, useState } from "react";
import menuItems from "@data/menuItems";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const QuickAccessMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty className="py-5 text-center text-xs text-slate-500 opacity-40 dark:text-slate-200">No results found.</CommandEmpty>
        <CommandGroup heading="General">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              router.push("/");
            }}
          >
            <Home className="mr-2 h-4 w-4 " />
            <div className="flex flex-col">
              <span>Home</span>
              <span className="mt-px text-xs font-thin">Base of operations</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Tools">
          {menuItems.map(({ icon: Icon, title, subtitle, link }) => (
            <CommandItem
              key={`tool-${title}`}
              onSelect={() => {
                setOpen(false);

                router.push(link);
              }}
            >
              <Icon className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>{title}</span>
                <span className="mt-px text-xs font-thin">{subtitle}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default QuickAccessMenu;
