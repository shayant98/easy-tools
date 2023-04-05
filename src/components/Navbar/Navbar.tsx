"use client";

import { AiOutlineHome } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/Button";
import { useTheme } from "next-themes";

import Link from "next/link";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTool } from "context/ToolContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const { name, description } = useTool();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <nav className="flex w-full h-20 py-2 px-20 mb-5 justify-between  bg-slate-200 dark:bg-slate-800"></nav>;
  }

  return (
    <nav className="flex w-full h-20 py-2 px-20 mb-5 justify-between  items-center bg-slate-200 dark:bg-slate-800">
      <div className="">
        {pathname.trim() != "/" && (
          <div className="">
            <Link href="/">
              <Button variant="subtle">
                <AiOutlineHome /> Home
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="">
        <h1 className="scroll-m-20 text-slate-800 dark:text-slate-100 text-4xl font-extrabold tracking-tight lg:text-5xl">{name}</h1>
      </div>
      <div className="inline-flex items-center gap-4">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: ` bg-gray-100 text-white`,
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton redirectUrl="/login" />
        </SignedOut>

        {theme === "dark" ? (
          <Button
            onClick={() => {
              setTheme("light");
              document.documentElement.setAttribute("data-color-mode", "light");
            }}
            variant={"outline"}
          >
            <BsSun />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setTheme("dark");
              document.documentElement.setAttribute("data-color-mode", "dark");
            }}
            variant={"outline"}
          >
            <BsMoon />
          </Button>
        )}
        <Sidebar />
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={inter.className}>
            <SignedIn>
              <Link href="/snippets">
                <DropdownMenuItem>Snippets</DropdownMenuItem>
              </Link>
            </SignedIn>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </nav>
  );
};

interface NavbarProps {
  showBackButton?: boolean;
}

export default Navbar;
