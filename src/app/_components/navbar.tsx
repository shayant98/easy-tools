"use client";

import { Button } from "@components/ui/button";
import { useTheme } from "next-themes";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Moon, Sun } from "lucide-react";
import Sidebar from "./sidebar";
import { cn } from "@utils/utils";
import { Switch } from "@components/ui/switch";
import { useEffect, useState } from "react";
import { Skeleton } from "@components/ui/skeleton";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-5 flex h-14 w-full items-center justify-between px-4  py-2  md:px-20">
        <Skeleton className="h-9 w-20" />
        <div className="inline-flex items-center justify-end gap-4">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    );
  }

  return (
    <nav className="mb-5 flex h-14 w-full items-center justify-between px-4  py-2  md:px-20">
      <div className="">
        {pathname?.trim() != "/" && (
          <div className="">
            <Link href="/">
              <Button variant="outline">
                <Home className=" mr-2 h-4 w-4" /> Home
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="inline-flex items-center justify-end gap-4">
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <Sun className=" h-4 w-4" /> : <Moon className=" h-4 w-4" />}
        </Button>

        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
