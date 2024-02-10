"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
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
    return <nav className="mb-5 flex h-14 w-full justify-between px-4  py-2 "></nav>;
  }

  return (
    <nav className="mb-5 flex h-14 w-full items-center justify-between px-4  py-2  md:px-20">
      <div className="">
        {pathname?.trim() != "/" && (
          <div className="">
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 mr-2 h-4 w-4" /> Home
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
                userButtonPopoverCard: ` bg-background text-primary-foreground`,
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
            <Sun className="mr-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setTheme("dark");
              document.documentElement.setAttribute("data-color-mode", "dark");
            }}
            variant={"outline"}
          >
            <Moon className="mr-2 h-4 w-4" />
          </Button>
        )}
        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
