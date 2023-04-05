"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/Command";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineSnippets, AiOutlineUserAdd } from "react-icons/ai";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import menuItems from "@data/menuItems";
import { useRouter } from "next/navigation";

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
        <CommandEmpty className="text-slate-500 dark:text-slate-200 opacity-40 text-xs text-center py-5">No results found.</CommandEmpty>
        <CommandGroup heading="General">
          <CommandItem onSelect={() => router.push("/")}>
            <AiOutlineHome className="mr-2 h-4 w-4 " />
            <div className="flex flex-col">
              <span>Home</span>
              <span className="text-xs mt-px font-thin">Base of operations</span>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Account">
          <SignedIn>
            <CommandItem onClick={() => signOut()}>
              <AiOutlineLogout className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Sign out</span>
                <span className="text-xs mt-px font-thin">Sign out of your account</span>
              </div>
            </CommandItem>
            <CommandItem key={`general-snippets`} onSelect={() => router.push("/snippets")}>
              <AiOutlineSnippets className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Snippets</span>
                <span className="text-xs mt-px font-thin">View your saved snippets</span>
              </div>
            </CommandItem>
          </SignedIn>
          <SignedOut>
            <CommandItem key={`tool-login`} onSelect={() => router.push("/login")}>
              <AiOutlineLogin className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Sign in</span>
                <span className="text-xs mt-px font-thin">Sign in to save your work</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/register")}>
              <AiOutlineUserAdd className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Create an account</span>
                <span className="text-xs mt-px font-thin">Create an account to save your work</span>
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
                <span className="text-xs mt-px font-thin">{subtitle}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default QuickAccessMenu;
