import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@components/Navbar/Navbar";
import Providers from "../providers";
import { cn } from "@utils/utils";
import QuickAccessMenu from "@components/QuickAccessMenu/QuickAccessMenu";
import Footer from "@components/Footer/footer";
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
      <body className={cn(`${inter.className} font-inter`, " min-h-screen bg-background antialiased")}>
        <ClerkProvider>
          <Providers>
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
            <Toaster richColors />
            <QuickAccessMenu />

            <Analytics />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
