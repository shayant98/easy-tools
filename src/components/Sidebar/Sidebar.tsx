"use client";

import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";
import { BiMenuAltRight } from "react-icons/bi";
import menuItems from "@data/menuItems";
import { Input } from "@components/ui/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const Sidebar = () => {
  const [search, setsearch] = useState("");
  const [filteredMenuItems, setfilteredMenuItems] = useState(menuItems);

  useEffect(() => {
    if (search.trim().length > 0) {
      setfilteredMenuItems(() => menuItems.filter((items) => items.title.toLowerCase().includes(search) || items.subtitle.toLowerCase().includes(search)));
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
        <Button variant={"subtle"}>
          <BiMenuAltRight size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-screen flex-col" size={"sm"}>
        <SheetHeader className="border-b border-slate-500 pb-3">
          <SheetTitle>Easy Tools</SheetTitle>
          <SheetDescription>Find the tool you need...</SheetDescription>
          <div className="flex justify-between">
            <SignedIn>
              <Link href={"/snippets"}>
                <Button>Snippets</Button>
              </Link>
            </SignedIn>
          </div>
        </SheetHeader>
        <div className="my-4">
          <Input value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search..." icon={AiOutlineSearch} />
        </div>

        <div className="relative h-full overflow-auto after:top-10 after:bg-gradient-to-t after:from-black after:to-white">
          {filteredMenuItems.map((item) => (
            <Link key={`sidebar-item-${item.title}`} href={item.link}>
              <div className="my-2 flex items-center gap-2 rounded-md border border-slate-500 p-2 text-slate-800 duration-100 hover:cursor-pointer hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-500">
                <div className="">
                  <item.icon size={24} />
                </div>
                <div className="">
                  <h6 className=" scroll-m-20  text-sm tracking-tight">{item.title}</h6>
                  <p className="[&:not(:first-child)]:m text-xs  leading-7">{item.subtitle}</p>
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
