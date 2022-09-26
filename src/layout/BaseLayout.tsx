import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { ToastContainer } from "react-toast";

const BaseLayout = ({ children, showBackButton, title, desc }: BaseLayoutProps) => {
  return (
    <div className="bg-gray-800 text-gray-200 h-screen w-screen flex flex-col items-start">
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
      <div className="grow w-full h-4/6">{children}</div>
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
