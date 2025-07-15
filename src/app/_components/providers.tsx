"use client";

import { ToolProvider } from "@/context/ToolContext";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			{/* <motion.div key={"index"} transition={{ duration: 0.75 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full"> */}
			<TRPCReactProvider>
				<ToolProvider>{children}</ToolProvider>
			</TRPCReactProvider>
		</ThemeProvider>
	);
};

export default Providers;
