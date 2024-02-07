import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Providers from "../providers";
import { cn } from "@utils/utils";
import QuickAccessMenu from "@components/QuickAccessMenu/QuickAccessMenu";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={cn(`${inter.className} font-inter`, "min-w-screen h-full min-h-screen bg-slate-200 text-gray-300 dark:bg-slate-800")}>
        <Providers>
          <ClerkProvider>
            {children}
            <QuickAccessMenu />
            <Analytics />
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
