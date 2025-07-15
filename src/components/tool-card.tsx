import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { IMenuItem } from "@/data/menuItems";
import { useSaveTool } from "@/hooks/use-tool-save-hook";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ToolCard = ({ menuItem }: IToolCardProps) => {
	const { title, subtitle, icon: Icon, link, tags, beta } = menuItem;
	const { hasCurrentTool, removeTool, saveTool } = useSaveTool(menuItem.id);

	return (
		<Link key={title} href={link}>
			<Card className="flex h-full w-60 flex-col justify-between border-none bg-secondary duration-200 hover:scale-105 hover:bg-primary/20 sm:w-80">
				<CardHeader>
					<CardTitle className="flex items-center gap-4">
						<Icon className="h-8 w-8 text-primary md:h-10 md:w-10" />
						<span className="flex items-center justify-between border-primary text-lg md:text-2xl">
							{title} {beta && <Badge variant="destructive">Beta</Badge>}{" "}
						</span>
					</CardTitle>

					<CardDescription>{subtitle}</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-between gap-10">
					<div className="flex flex-1 flex-wrap gap-1">
						{tags.slice(0, 2).map((tag) => (
							<Badge key={`${tag}`} className="text-[10px]">
								{tag}
							</Badge>
						))}
						{/* {tags.length > 2 && <Badge>+{tags.length - 2}</Badge>} */}
					</div>
					<Button
						size={"icon"}
						variant={"ghost"}
						onClick={(e) => {
							e.preventDefault();
							hasCurrentTool ? removeTool(menuItem.id) : saveTool(menuItem.id);
						}}
					>
						{hasCurrentTool ? (
							<Heart className="text-red-500" />
						) : (
							<Heart className="text-gray-500" />
						)}
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
