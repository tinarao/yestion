"use client";

import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/theming/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/useScroll";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const scrolled = useScroll();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header
      className={`
        fixed py-4 px-6 top-0 w-full
        bg-background dark:bg-[#1F1F1F]
        flex items-center justify-between
        ${scrolled && "border-b-2 shadow-md"}
      `}
    >
      <div className="flex space-x-10">
        <Logo size={30} />
      </div>
      <div className="flex gap-6 items-center">
        {isLoading && <Loader size="lg" />}
        {!isAuthenticated && !isLoading && (
          <div className="space-x-6">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Войти
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Нет аккаунта?</Button>
            </SignUpButton>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Приступить к работе</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
