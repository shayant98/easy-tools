import Link from "next/link";
import { AiOutlineGithub, AiOutlineHome } from "react-icons/ai";
import { ToastContainer } from "react-toast";

const BaseLayout = ({ children, showBackButton, title, desc }: BaseLayoutProps) => {
  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen min-w-screen h-full flex flex-col items-start">
      {showBackButton && (
        <div className="px-20 py-5">
          <Link href="/">
            <button className="flex gap-2 items-center bg-gray-900 px-4 py-2 rounded hover:shadow hover:scale-105 transition duration-200">
              <AiOutlineHome /> Home
            </button>
          </Link>
        </div>
      )}
      <div className="px-20 pb-5">
        <h1 className="text-7xl mb-3">{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="grow w-full mb-5 px-20">{children}</div>
      <footer className="flex  justify-center items-center gap-x-1 bg-gray-900 py-5 w-full text-center text-sm text-gray-400 ">
        Built by{" "}
        <a href="https://www.shayantsital.com" target={"_blank"} rel="noreferrer" className="hover:text-gray-100">
          Shayant Sital
        </a>
        <a href="https://www.github.com/shayant98" target={"_blank"} rel="noreferrer">
          <AiOutlineGithub className="hover:text-gray-100" />
        </a>
        - <span className="text-red-500 font-bold">BETA</span>
      </footer>
      <ToastContainer position="bottom-right" delay={2000} />
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
