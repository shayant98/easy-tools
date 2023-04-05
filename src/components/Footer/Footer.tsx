import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
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
        Support the development 🍵
      </Link>
    </footer>
  );
};

export default Footer;
