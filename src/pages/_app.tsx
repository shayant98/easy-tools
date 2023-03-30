import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { api } from "../utils/api";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <ThemeProvider attribute="class">
        <ClerkProvider
          {...pageProps}
          appearance={{
            variables: {
              fontFamily: `var(${inter.variable})`,
            },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              transition={{ duration: 0.75 }}
              initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              exit={{ opacity: 0, clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
              className={`${inter.variable} font-sans`}
            >
              <Component {...pageProps} />
              <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} draggable theme="dark" />
            </motion.div>
          </AnimatePresence>
          <Analytics />
        </ClerkProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
