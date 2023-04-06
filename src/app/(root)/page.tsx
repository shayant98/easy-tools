"use client";

import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "@components/ui/Input";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import ToolCard from "@components/ToolCard";
import menuItems from "data/menuItems";
import { Label } from "@components/ui/Label";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isWindows, setisWindows] = useState(false);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.navigator.userAgent.indexOf("Windows") !== -1) {
      setisWindows(true);
    }

    return () => {
      setisWindows(false);
    };
  }, []);

  return (
    <main className="w-full h-full mb-10">
      <div className="flex items-center justify-center w-full">
        <div className="w-full px-4 md:px-0 max-w-lg items-end flex gap-2">
          <div className="grow">
            <Label>Search</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              icon={AiOutlineSearch}
              showClear
              shortcutIcon={!isWindows ? "⌘ + /" : "Ctrl + /"}
            />
          </div>
        </div>
      </div>
      {fitleredItems.length > 0 ? (
        <div className="grid mt-10 gap-4 content-center justify-items-center sm:grid-cols-1  md:grid-cols-4">
          {fitleredItems.map(({ icon: Icon, title, subtitle, link, tags }, i) => (
            <motion.div
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -50 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              key={title}
              className="w-max"
            >
              <ToolCard icon={Icon} title={title} subtitle={subtitle} link={link} tags={tags} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full items-center h-full">
          <h1 className="text-2xl h-86">No results found for &apos;{search}&apos;</h1>
        </div>
      )}
    </main>
  );
};

export default Home;
