import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../contexts/main.context";

import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <Component {...pageProps} />
      <ToastContainer 
        position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  transition={Zoom} // ou Slide, Flip, Bounce
      />
    </AppProvider>
  )
}
