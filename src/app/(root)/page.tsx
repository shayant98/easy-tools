"use client";

import type { NextPage } from "next";
import { Input } from "@components/ui/Input";
import { useEffect, useState } from "react";
import ToolCard from "@components/tool-card";
import menuItems, { type IMenuItem } from "data/menuItems";
import { Label } from "@components/ui/label";
import { motion } from "framer-motion";
import { useTool } from "context/ToolContext";
import { Button } from "@components/ui/button";
import { Filter, Search } from "lucide-react";

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
    <main className="h-full w-full grow ">
      <div className="flex w-full items-end justify-center gap-2">
        <div className="flex w-full max-w-lg items-end gap-2 px-4 md:px-0">
          <div className="grow">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." icon={Search} />
          </div>
        </div>
        <Button size={"icon"}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      {fitleredItems.length > 0 ? (
        <div className="mt-4 flex flex-col">
          <div className="flex grow flex-wrap justify-center gap-4">
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
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="h-86 text-2xl">No results found for &apos;{search}&apos;</h1>
        </div>
      )}
    </main>
  );
};

export default Home;
