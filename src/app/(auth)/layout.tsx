import Header from "@/components/sheard/Header";
import Navbar from "@/components/sheard/Navbar";
import { Toaster } from "@/components/ui/toast";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Navbar />

      {children}
      <Toaster />
    </div>
  );
};

export default layout;
