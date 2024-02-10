"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import menuItems from "@data/menuItems";
import { useRouter } from "next/navigation";
import { Home, LogIn, LogOut, UserPlus2 } from "lucide-react";

const QuickAccessMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && e.metaKey) {
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
          <CommandItem onSelect={() => router.push("/")}>
            <Home className="mr-2 h-4 w-4 " />
            <div className="flex flex-col">
              <span>Home</span>
              <span className="mt-px text-xs font-thin">Base of operations</span>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Account">
          <SignedIn>
            <CommandItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Sign out</span>
                <span className="mt-px text-xs font-thin">Sign out of your account</span>
              </div>
            </CommandItem>
            {/* <CommandItem key={`general-snippets`} onSelect={() => router.push("/snippets")}>
              <AiOutlineSnippets className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Snippets</span>
                <span className="text-xs mt-px font-thin">View your saved snippets</span>
              </div>
            </CommandItem> */}
          </SignedIn>
          <SignedOut>
            <CommandItem key={`tool-login`} onSelect={() => router.push("/login")}>
              <LogIn className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Sign in</span>
                <span className="mt-px text-xs font-thin">Sign in to save your work</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/register")}>
              <UserPlus2 className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Create an account</span>
                <span className="mt-px text-xs font-thin">Create an account to save your work</span>
              </div>
            </CommandItem>
          </SignedOut>
        </CommandGroup>

        <CommandGroup heading="Tools">
          {menuItems.map(({ icon: Icon, title, subtitle, link }) => (
            <CommandItem key={`tool-${title}`} onSelect={() => router.push(link)}>
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
