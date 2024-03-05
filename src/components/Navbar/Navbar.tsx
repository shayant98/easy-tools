"use client";

import { Button } from "@components/ui/button";
import { useTheme } from "next-themes";

import Link from "next/link";
import Sidebar from "@components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { Home, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

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
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          variant={"outline"}
          size={"icon"}
        >
          {theme === "dark" ? <Sun className=" h-4 w-4" /> : <Moon className=" h-4 w-4" />}
        </Button>

        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
