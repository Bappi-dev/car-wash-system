import Header from "@/components/sheard/Header";
import Navbar from "@/components/sheard/Navbar";
import type { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
