import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import Navbar from "@components/Navbar/Navbar";
import QuickAccessMenu from "@components/QuickAccessMenu/QuickAccessMenu";
const BaseLayout = ({ children, showBackButton, title, desc }: BaseLayoutProps) => {
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
      <QuickAccessMenu />
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
