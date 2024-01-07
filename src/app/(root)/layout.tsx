import { ClerkProvider } from "@clerk/nextjs";
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
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Easy Tools",
  description: "Easy Tools is a collection of tools for developers.",
  applicationName: "Easy Tools",
  keywords:
    "tools, developer, developer tools, easy tools, easytools, easy tools for developers, easytools for developers, qr code, qr code generator, json, json to js, js to json, docker, docker compose, docker compose generator, docker compose file, docker compose file generator, docker compose file generator",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={inter.className}>
      <body className={cn(``, "bg-slate-200 dark:bg-slate-800 text-gray-300 min-h-screen min-w-screen  flex flex-col items-start")}>
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
