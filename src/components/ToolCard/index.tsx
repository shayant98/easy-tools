import Link from "next/link";
import { IconType } from "react-icons";
import { SiTypescript } from "react-icons/si";

const ToolCard = ({ title, icon: Icon, subtitle, link }: { title: string; subtitle: string; icon: IconType; link: string }) => {
  return (
    <Link key={title} href={link}>
      <div className="flex flex-col items-center rounded bg-gray-900 h-full  p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
        <Icon className="text-7xl" />
        <h3 className="text-2xl mt-5">{title}</h3>
        <span className="text-sm">{subtitle}</span>
      </div>
    </Link>
  );
};

export default ToolCard;
