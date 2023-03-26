import { Button } from "@components/ui/Button";
import Link from "next/link";
import { AiOutlineGithub, AiOutlineHome } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

const BaseLayout = ({ children, showBackButton, title, desc }: BaseLayoutProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-slate-100 dark:bg-slate-800 text-gray-200 min-h-screen min-w-screen h-full  flex flex-col items-start">
      <div className="flex w-full py-2 px-20 mb-5 justify-between  bg-slate-100 dark:bg-slate-800">
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
            <Button onClick={() => setTheme("light")} variant={"outline"}>
              <BsSun />
            </Button>
          ) : (
            <Button onClick={() => setTheme("dark")} variant={"outline"}>
              <BsMoon />
            </Button>
          )}
        </div>
      </div>
      <div className=""></div>
      <div className="px-20 pb-5">
        <h1 className="text-4xl mb-3">{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="flex flex-col grow w-full mb-5  px-20">{children}</div>
      <footer className="flex  justify-center items-center gap-x-1 bg-slate-100 dark:bg-slate-800 py-5 w-full text-center text-sm text-gray-400 ">
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
