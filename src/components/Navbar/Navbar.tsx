import { AiOutlineGithub, AiOutlineHome } from "react-icons/ai";
import { BsMoon, BsSun, BsThreeDotsVertical } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/Button";
import { useTheme } from "next-themes";

import { Inter } from "next/font/google";
import Link from "next/link";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

const Navbar = ({ showBackButton }: NavbarProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex w-full py-2 px-20 mb-5 justify-between  bg-slate-200 dark:bg-slate-800">
      <div className="">
        {showBackButton && (
          <div className="">
            <Link href="/">
              <Button variant="subtle">
                <AiOutlineHome /> Home
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className=""></div>
      <div className="inline-flex items-center gap-4">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: `${inter.className} bg-gray-100 text-white`,
              },

              userProfile: { elements: { modalContent: `${inter.className}`, userPreview: `${inter.className}` } },
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
