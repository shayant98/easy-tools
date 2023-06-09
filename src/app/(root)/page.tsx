"use client";

import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "@components/ui/Input";
import { useEffect, useState } from "react";
import ToolCard from "@components/ToolCard";
import menuItems, { IMenuItem } from "data/menuItems";
import { Label } from "@components/ui/Label";
import { motion } from "framer-motion";
import { useTool } from "context/ToolContext";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isWindows, setisWindows] = useState(false);
  const [fitleredItems, setfitleredItems] = useState<IMenuItem[]>(menuItems);
  const { setTool } = useTool();

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

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   if (window.navigator.userAgent.indexOf("Windows") !== -1) {
  //     setisWindows(true);
  //   }
  //   return () => {
  //     setisWindows(false);
  //   };
  // }, []);

  return (
    <main className="w-full grow h-full">
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
        <div className="flex flex-col mt-4">
          <div className="flex grow flex-wrap gap-4 justify-center">
            {fitleredItems.map((menuItem, i) => (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                key={menuItem.title}
                className="w-max"
              >
                <ToolCard menuItem={menuItem} />
              </motion.div>
            ))}
          </div>
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
