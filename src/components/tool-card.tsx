import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { type IMenuItem } from "@data/menuItems";
import { useTool } from "context/ToolContext";
import { useSaveTool } from "hooks/use-tool-save-hook";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

const ToolCard = ({ menuItem }: IToolCardProps) => {
  const { title, subtitle, icon: Icon, link, tags } = menuItem;
  const { hasCurrentTool, removeTool, saveTool } = useSaveTool(menuItem.id);

  return (
    <Link key={title} href={link}>
      <Card className="flex h-full w-80 flex-col justify-between bg-secondary border-none hover:bg-primary/20 duration-200 hover:scale-105">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Icon className="text-primary" />
            <span className="border-l-2  border-primary pl-5 text-2xl  ">{title}</span>
          </CardTitle>

          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-10 justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <div key={`${tag}`} className="rounded-full bg-primary/20 px-2 py-1 text-xs">
                {tag}
              </div>
            ))}
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              hasCurrentTool ? removeTool(menuItem.id) : saveTool(menuItem.id);
            }}
          >
            {hasCurrentTool ? <Heart className="text-red-500" /> : <Heart className="text-gray-500" />}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

interface IToolCardProps {
  menuItem: IMenuItem;
}

export default ToolCard;
