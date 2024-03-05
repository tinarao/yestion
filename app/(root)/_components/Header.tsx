"use client";

import Logo from "@/components/Logo";
import ThemeToggle from "@/components/theming/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/useScroll";

const Header = () => {
  const scrolled = useScroll();

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
      <div className="flex gap-16">
        <div>
          <ThemeToggle />
        </div>
        <Button variant="ghost">Войти</Button>
        <Button>Начать работу</Button>
      </div>
    </header>
  );
};

export default Header;
