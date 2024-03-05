import Logo from "@/components/Logo";
import React from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
