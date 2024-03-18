import { Inter } from "next/font/google";
import "../../styles/globals.css";
import Navbar from "app/_components/navbar";
import Providers from "../providers";
import { cn } from "@utils/utils";
import QuickAccessMenu from "app/_components/quick-access-menu";
import Footer from "app/_components/footer";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@components/ui/sonner";
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
    <html>
      <body className={cn(`${inter.className} font-inter`, "flex flex-col min-h-screen bg-background antialiased")}>
        <Providers>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
          <Toaster richColors />
          <QuickAccessMenu />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
