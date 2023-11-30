import "./styles/globals.css";
import "./styles/custom.css";
import { Inter } from "next/font/google";
import { Providers } from "../src/redux/provider/provider";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import ToasterContext from "../src/context/ToasterContext";
// import "antd/dist/antd.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GoNow Foods | Dashboard",
  description: "Manage your orders the smart and easy way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToasterContext />
        </Providers>
      </body>
    </html>
  );
}
