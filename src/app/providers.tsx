"use client";

import { api } from "@utils/api";
import { ToolProvider } from "context/ToolContext";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: any }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence mode="wait">
        {/* <motion.div key={"index"} transition={{ duration: 0.75 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full"> */}
        <ToolProvider>{children}</ToolProvider>
        {/* </motion.div> */}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default api.withTRPC(Providers);
