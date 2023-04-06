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
import Loading from "./loading";
import { api } from "@utils/api";
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={cn(`${inter.variable} font-sans`, "bg-slate-200 dark:bg-slate-800 text-gray-300 min-h-screen min-w-screen  flex flex-col items-start")}>
        <ClerkProvider>
          <Providers>
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
            <Toast />
            <QuickAccessMenu />

            <Analytics />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
