"use client";

import { api, ClientProvider } from "@utils/api";
import { ToolProvider } from "context/ToolContext";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* <motion.div key={"index"} transition={{ duration: 0.75 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full"> */}
      <ClientProvider>
        <ToolProvider>{children}</ToolProvider>
      </ClientProvider>
      {/* </motion.div> */}
    </ThemeProvider>
  );
};

export default Providers;
