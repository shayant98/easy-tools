import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const BaseComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <HydrateClient>
          <main className="flex min-h-screen flex-col px-10 py-5">{children}</main>
        </HydrateClient>
      </NextThemesProvider>
    </TRPCReactProvider>
  );
};

export default BaseComponent;
