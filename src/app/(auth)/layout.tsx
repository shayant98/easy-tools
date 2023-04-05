import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@components/Navbar/Navbar";
import Providers from "../providers";
import { cn } from "@utils/utils";
import Toast from "@components/ui/Toast";
import QuickAccessMenu from "@components/QuickAccessMenu/QuickAccessMenu";
import Footer from "@components/Footer/Footer";
import { Suspense } from "react";
import Loading from "../(root)/loading";
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={cn(`${inter.variable} font-sans`, "bg-slate-200 dark:bg-slate-800 text-gray-300 min-h-screen min-w-screen h-full")}>
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
