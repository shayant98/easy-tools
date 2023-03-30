import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSlash } from "react-icons/bs";
import BaseLayout from "@layout/BaseLayout";
import Input from "@components/ui/Input";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import ToolCard from "@components/ToolCard";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/Command";
import Link from "next/link";
import menuItems from "data/menuItems";
const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [fitleredItems, setfitleredItems] = useState<
    {
      title: string;
      subtitle: string;
      icon: IconType;
      link: string;
      tags?: string[];
    }[]
  >(menuItems);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && e.metaKey) {
        console.log(123);

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      setfitleredItems((prev) => menuItems.filter((items) => items.title.toLowerCase().includes(search) || items.subtitle.toLowerCase().includes(search)));
    } else {
      setfitleredItems(menuItems);
    }

    return () => {
      setfitleredItems([]);
    };
  }, [search]);

  return (
    <BaseLayout>
      <main className="">
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-lg items-end flex gap-2">
            <div className="grow">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." icon={AiOutlineSearch} showClear shortcutIcon={BsSlash} />
            </div>
          </div>
        </div>
        {fitleredItems.length > 0 ? (
          <div className="mt-10 flex justify-center flex-wrap gap-10">
            {fitleredItems.map(({ icon: Icon, title, subtitle, link, tags }) => (
              <ToolCard key={title} icon={Icon} title={title} subtitle={subtitle} link={link} tags={tags} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl">No results found for &apos;{search}&apos;</h1>
          </div>
        )}
      </main>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty className="text-slate-200 opacity-40 text-xs text-center py-5">No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {menuItems.map(({ icon: Icon, title, subtitle, link, tags }) => (
              <Link key={`tool-${title}`} href={link}>
                <CommandItem>
                  <Icon className="mr-2 h-4 w-4 " />
                  <div className="flex flex-col">
                    <span>{title}</span>
                    <span className="text-xs mt-px font-thin">{subtitle}</span>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </BaseLayout>
  );
};

export default Home;
