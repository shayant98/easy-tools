"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/Button";
import { useTheme } from "next-themes";

import Link from "next/link";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // const { tool } = useTool();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <nav className="flex w-full h-14 py-2 px-4 mb-5 justify-between  bg-slate-200 dark:bg-slate-800"></nav>;
  }

  return (
    <nav className="flex w-full h-14 py-2 px-4 md:px-20 mb-5 justify-between  items-center bg-slate-200 dark:bg-slate-800">
      <div className="">
        {pathname?.trim() != "/" && (
          <div className="">
            <Link href="/">
              <Button variant="subtle">
                <Home className="w-4 h-4" /> Home
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="inline-flex items-center justify-end gap-4">
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
          <SignInButton redirectUrl="/" />
        </SignedOut>

        {theme === "dark" ? (
          <Button
            onClick={() => {
              setTheme("light");
              document.documentElement.setAttribute("data-color-mode", "light");
            }}
            variant={"outline"}
          >
            <Sun className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setTheme("dark");
              document.documentElement.setAttribute("data-color-mode", "dark");
            }}
            variant={"outline"}
          >
            <Moon className="w-4 h-4" />
          </Button>
        )}
        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
