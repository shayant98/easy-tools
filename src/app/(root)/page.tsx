"use client";

import type { NextPage } from "next";
import { Input } from "@components/ui/Input";
import { useEffect, useState } from "react";
import ToolCard from "@components/tool-card";
import menuItems, { type IMenuItem } from "data/menuItems";
import { Button } from "@components/ui/button";
import { Filter, Search } from "lucide-react";
import { useSaveTool } from "hooks/use-tool-save-hook";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isWindows, setisWindows] = useState(false);
  const [fitleredItems, setfitleredItems] = useState<IMenuItem[]>(menuItems);
  const { savedTools } = useSaveTool();

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
    setisWindows(navigator.userAgentData?.platform != "macOS");
  }, []);

  return (
    <main className="h-full w-full grow ">
      <div className="flex w-full items-end justify-center gap-2">
        <div className="flex w-full max-w-lg items-end gap-2 px-4 md:px-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }} className="grow">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              icon={Search}
              trailing={<span className="bg-muted/20 px-8 text-xs  py-2 text-nowrap ">{isWindows ? "Ctrl + K" : "CMD + K"}</span>}
            />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}>
          <Button size={"icon"}>
            <Filter className="h-3 w-3" />
          </Button>
        </motion.div>
      </div>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }} className="px-20 text-3xl font-bold">
        All Tools
      </motion.h2>
      {fitleredItems.length > 0 ? (
        <div className="mt-4 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4">
            {fitleredItems
              .sort((a, b) => {
                return savedTools.includes(a.id) ? -1 : 1;
              })
              .map((menuItem, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: "easeInOut" }}
                  key={menuItem.title}
                  className="w-max"
                >
                  <ToolCard menuItem={menuItem} />
                </motion.div>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="h-86 text-2xl">No results found for &apos;{search}&apos;</h1>
        </div>
      )}
    </main>
  );
};

export default Home;
