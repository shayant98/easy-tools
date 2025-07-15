"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import menuItems from "@/data/menuItems";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";

const Sidebar = () => {
	const [search, setsearch] = useState("");
	const [filteredMenuItems, setfilteredMenuItems] = useState(menuItems);

	useEffect(() => {
		if (search.trim().length > 0) {
			setfilteredMenuItems(() =>
				menuItems.filter(
					(items) =>
						items.title.toLowerCase().includes(search) ||
						items.subtitle.toLowerCase().includes(search),
				),
			);
		} else {
			setfilteredMenuItems(menuItems);
		}

		return () => {
			setfilteredMenuItems([]);
		};
	}, [search]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<BiMenuAltRight size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex h-screen flex-col border-none">
				<SheetHeader className="border-slate-500 border-b pb-3">
					<SheetTitle>Easy Tools</SheetTitle>
					<SheetDescription>Find the tool you need...</SheetDescription>
				</SheetHeader>
				<div className="">
					<Input
						value={search}
						onChange={(e) => setsearch(e.target.value)}
						placeholder="Search..."
					/>
				</div>

				<div className="relative flex h-full flex-col gap-5 overflow-auto">
					{filteredMenuItems.length === 0 && (
						<div className="flex items-center justify-center gap-4 text-center text-muted-foreground">
							<AiOutlineSearch size={21} />
							<p>No results found</p>
						</div>
					)}
					{filteredMenuItems.map((item) => (
						<Link key={`sidebar-item-${item.title}`} href={item.link}>
							<div className=" flex items-center gap-5 rounded-md border border-none bg-secondary p-2 text-slate-800 duration-100 hover:cursor-pointer hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-500">
								<div className="">
									<item.icon size={24} />
								</div>
								<div className="">
									<h6 className=" scroll-m-20 text-sm tracking-tight">
										{item.title}
									</h6>
									<p className="[&:not(:first-child)]:m text-muted-foreground text-xs leading-4">
										{item.subtitle}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Sidebar;
