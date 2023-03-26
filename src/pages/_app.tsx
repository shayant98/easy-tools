import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { api } from "../utils/api";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} draggable theme="dark" />
      </main>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
