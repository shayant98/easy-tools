// import { Inter } from "next/font/google";
// import "../../styles/globals.css";
// import Navbar from "@/app/_components/navbar";
// import Providers from "../_components/providers";
// import { cn } from@/lib/utils;
// import QuickAccessMenu from "@/app/_components/quick-access-menu";
// import { Suspense } from "react";
// import Loading from "./loading";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  icons: {
    icon: ["/favicon/favicon.ico?v=4"],
    apple: ["/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
  title: "Easy Tools",
  description: "Easy Tools is a collection of tools for developers.",
  applicationName: "Easy Tools",
  keywords:
    "tools, developer, developer tools, easy tools, easytools, easy tools for developers, easytools for developers, qr code, qr code generator, json, json to js, js to json, docker, docker compose, docker compose generator, docker compose file, docker compose file generator, docker compose file generator",
};

// const RootLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <html>
//       <body className={cn(`${inter.className} font-inter`, "flex flex-col min-h-screen bg-background antialiased")}>
//         <Providers>
//           <Navbar />
//           <Suspense fallback={<Loading />}>{children}</Suspense>
//           <Footer />
//           <Toaster richColors />
//           <QuickAccessMenu />
//         </Providers>
//       </body>
//     </html>
//   );
// };

// export default RootLayout;

import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Suspense } from "react";
import { Footer } from "react-day-picker";
import { Toaster } from "sonner";
import Navbar from "../_components/navbar";
import Providers from "../_components/providers";
import QuickAccessMenu from "../_components/quick-access-menu";
import Loading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(`${inter.className} font-inter`, "flex min-h-screen flex-col bg-background antialiased")}>
      <body>
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
}
