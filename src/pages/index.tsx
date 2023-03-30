import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSlash } from "react-icons/bs";
import BaseLayout from "@layout/BaseLayout";
import Input from "@components/ui/Input";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import ToolCard from "@components/ToolCard";

import menuItems from "data/menuItems";
import { Label } from "@components/ui/Label";
import { motion } from "framer-motion";
const Home: NextPage = () => {
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
    if (search.trim().length > 0) {
      setfitleredItems(() => menuItems.filter((items) => items.title.toLowerCase().includes(search) || items.subtitle.toLowerCase().includes(search)));
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
              <Label>Search</Label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                icon={AiOutlineSearch}
                showClear
                shortcutIcon={window.navigator.userAgent.includes("Mac") ? "⌘ + /" : "Ctrl + /"}
              />
            </div>
          </div>
        </div>
        {fitleredItems.length > 0 ? (
          <div className="mt-10 flex justify-center flex-wrap gap-10">
            {fitleredItems.map(({ icon: Icon, title, subtitle, link, tags }, i) => (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                key={title}
                className=""
              >
                <ToolCard icon={Icon} title={title} subtitle={subtitle} link={link} tags={tags} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl">No results found for &apos;{search}&apos;</h1>
          </div>
        )}
      </main>
    </BaseLayout>
  );
};

export default Home;
