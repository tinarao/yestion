"use client"

import Loader from "@/components/Loader";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import * as React from "react";
import NavBar from "./_components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
        <div className="w-fit mx-auto py-48">
            <Loader size="xl" />
        </div>
    );
  } else if (!isAuthenticated && !isLoading) {
    redirect("/");
  } else {
    return (
        <div className="h-full flex bg-background dark:bg-[#1F1F1F]">
            <NavBar />
            <main className="flex-1 h-full overflow-y-auto">
                { children }
            </main>
        </div>
    );
  }
};

export default Layout;
