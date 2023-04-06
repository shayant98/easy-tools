import Link from "next/link";
import { IconType } from "react-icons";
import { SiTypescript } from "react-icons/si";

const ToolCard = ({ title, icon: Icon, subtitle, link, tags = [] }: { title: string; subtitle: string; icon: IconType; link: string; tags?: string[] }) => {
  return (
    <Link key={title} href={link}>
      <div className="flex flex-col justify-between  items-center  rounded-lg bg-white dark:bg-slate-900 h-full  p-5 w-80 text-center hover:scale-105 transition duration-200 cursor-pointer">
        <Icon className="text-5xl text-slate-600 dark:text-slate-200" />
        <h3 className="text-2xl mt-5 text-slate-800 dark:text-slate-200  ">{title}</h3>
        <span className="text-sm text-slate-800 dark:text-slate-200">{subtitle}</span>
        {tags.length > 0 ? (
          <div className="flex overflow-hidden flex-wrap gap-1 mt-2 self-start">
            {tags.slice(0, 3).map((tag) => (
              <div key={`${tag}`} className="text-xs text-slate-900/50 dark:text-slate-300/50 px-2 py-1 dark:bg-gray-100/25 rounded-full">
                {tag}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default ToolCard;
