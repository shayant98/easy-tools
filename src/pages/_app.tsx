import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { api } from "../utils/api";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider
        {...pageProps}
        appearance={{
          variables: {
            fontFamily: `var(${inter.variable})`,
          },
        }}
      >
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} draggable theme="dark" />
        </main>
        <Analytics />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
