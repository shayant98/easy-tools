import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/Command";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineSnippets, AiOutlineUserAdd } from "react-icons/ai";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import menuItems from "@data/menuItems";

const QuickAccessMenu = () => {
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
          <Link key={`tool-home`} href={"/"}>
            <CommandItem>
              <AiOutlineHome className="mr-2 h-4 w-4 " />
              <div className="flex flex-col">
                <span>Home</span>
                <span className="text-xs mt-px font-thin">Base of operations</span>
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>
        <CommandGroup heading="Account">
          <SignedIn>
            <button onClick={() => signOut()} className="flex flex-col">
              <CommandItem>
                <AiOutlineLogout className="mr-2 h-4 w-4 " />

                <span>Sign out</span>
                <span className="text-xs mt-px font-thin">Sign out</span>
              </CommandItem>
            </button>
            <Link key={`account-snippet`} href={"/snippet"}>
              <CommandItem>
                <AiOutlineSnippets className="mr-2 h-4 w-4 " />
                <div className="flex flex-col">
                  <span>Snippets</span>
                  <span className="text-xs mt-px font-thin">View your saved snippets</span>
                </div>
              </CommandItem>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link key={`tool-login`} href={"/login"}>
              <CommandItem>
                <AiOutlineLogin className="mr-2 h-4 w-4 " />
                <div className="flex flex-col">
                  <span>Sign in</span>
                  <span className="text-xs mt-px font-thin">Sign in to save your work</span>
                </div>
              </CommandItem>
            </Link>
            <Link key={`tool-register`} href={"/register"}>
              <CommandItem>
                <AiOutlineUserAdd className="mr-2 h-4 w-4 " />
                <div className="flex flex-col">
                  <span>Create an account</span>
                  <span className="text-xs mt-px font-thin">Create an account to save your work</span>
                </div>
              </CommandItem>
            </Link>
          </SignedOut>
        </CommandGroup>

        <CommandGroup heading="Tools">
          {menuItems.map(({ icon: Icon, title, subtitle, link }) => (
            <Link key={`tool-${title}`} href={link}>
              <CommandItem>
                <Icon className="mr-2 h-4 w-4 " />
                <div className="flex flex-col">
                  <span>{title}</span>
                  <span className="text-xs mt-px font-thin">{subtitle}</span>
                </div>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default QuickAccessMenu;
