import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { type IMenuItem } from "@data/menuItems";
import { useTool } from "context/ToolContext";
import Link from "next/link";

const ToolCard = ({ menuItem }: IToolCardProps) => {
  const { title, subtitle, icon: Icon, link, tags } = menuItem;
  const { setTool } = useTool();
  return (
    <Link key={title} href={link} onClick={() => setTool(menuItem)}>
      <Card className="flex h-full w-80 flex-col justify-between hover:bg-primary/20 duration-200 hover:scale-105">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Icon className="text-primary" />
            <span className="border-l-2  border-primary pl-5 text-2xl  ">{title}</span>
          </CardTitle>

          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <div key={`${tag}`} className="rounded-full bg-secondary px-2 py-1 text-xs">
              {tag}
            </div>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

interface IToolCardProps {
  menuItem: IMenuItem;
}

export default ToolCard;