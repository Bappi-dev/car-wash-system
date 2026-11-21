import Header from "@/components/sheard/Header";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import type { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
