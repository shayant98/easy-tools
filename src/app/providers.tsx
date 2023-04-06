"use client";

import { api, ClientProvider } from "@utils/api";
import { ToolProvider } from "context/ToolContext";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react-markdown/lib/ast-to-react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence mode="wait">
        {/* <motion.div key={"index"} transition={{ duration: 0.75 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full"> */}
        <ClientProvider>
          <ToolProvider>{children}</ToolProvider>
        </ClientProvider>
        {/* </motion.div> */}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Providers;
