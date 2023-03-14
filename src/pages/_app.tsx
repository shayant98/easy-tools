import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { api } from "../utils/api";
import { Analytics } from "@vercel/analytics/react";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} draggable theme="dark" />
    </>
  );
};

export default api.withTRPC(MyApp);
