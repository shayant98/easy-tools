import { Button } from "@components/ui/Button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/Sheet";
import { BiMenuAltRight } from "react-icons/bi";
import menuItems from "@data/menuItems";
import Input from "@components/ui/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <SheetContent className="h-screen" size={"sm"}>
        <SheetHeader className="border-b pb-3 border-slate-500">
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

        <div className="relative h-full overflow-auto after:top-10 after:from-black after:bg-gradient-to-t after:to-white">
          {filteredMenuItems.map((item) => (
            <Link key={`sidebar-item-${item.title}`} href={item.link}>
              <div className="p-2 border border-slate-500 text-slate-800 dark:text-slate-50 my-2 rounded-md hover:cursor-pointer flex items-center gap-2 dark:hover:bg-slate-500 hover:bg-slate-100 duration-100">
                <div className="">
                  <item.icon size={24} />
                </div>
                <div className="">
                  <h6 className=" scroll-m-20  text-sm tracking-tight">{item.title}</h6>
                  <p className="leading-7 [&:not(:first-child)]:m  text-xs">{item.subtitle}</p>
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
