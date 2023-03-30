import Link from "next/link";
import { AiOutlineGithub, AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineSnippets, AiOutlineUserAdd } from "react-icons/ai";
import Navbar from "@components/Navbar/Navbar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/Command";
import menuItems from "@data/menuItems";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
const BaseLayout = ({ children, showBackButton, title, desc }: BaseLayoutProps) => {
  const [open, setOpen] = useState(false);
  const { signOut, openSignIn } = useClerk();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && e.metaKey) {
        console.log(123);

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="bg-slate-200 dark:bg-slate-800 text-gray-300 min-h-screen min-w-screen h-full  flex flex-col items-start">
      <Navbar showBackButton={showBackButton} />
      <div className="px-20 pb-5">
        <h1 className="scroll-m-20 text-slate-800 dark:text-slate-100 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
        {desc && (
          <div className="p-2 rounded-md border text-slate-800 dark:text-slate-100 border-slate-400 bg-slate-100 dark:border-slate-800 dark:bg-slate-700 mt-2">
            <p className="text-slate-800 dark:text-slate-100 text-lg ">{desc}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col grow w-full mb-5  px-20">{children}</div>
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
      <footer className="flex  justify-center items-center gap-x-1 bg-slate-200 dark:bg-slate-800 py-5 w-full text-center text-sm text-gray-400 ">
        Built by{" "}
        <a href="https://www.shayantsital.com" target={"_blank"} rel="noreferrer" className="hover:text-gray-100">
          Shayant Sital
        </a>
        <a href="https://www.github.com/shayant98" target={"_blank"} rel="noreferrer">
          <AiOutlineGithub className="hover:text-gray-100" />
        </a>
        - <span className="text-red-500 font-bold">BETA </span> -
        <Link className="hover:text-green-600 duration-200" target={"_blank"} href={`https://www.buymeacoffee.com/shayant`}>
          {" "}
          Support the development 🍵
        </Link>
      </footer>
    </div>
  );
};

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  showBackButton?: boolean;
  title?: string;
  desc?: string;
}

export default BaseLayout;
