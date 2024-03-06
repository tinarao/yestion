import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full p-6 bg-background dark:bg-[#1F1F1F] z-50 border-t-2">
      <div>
        <Logo size={50} />
      </div>
      <div className="ml-auto justify-between md:justify-end items-center gap-2 text-muted-foreground">
        <Button variant="ghost" disabled>
            Политика приватности
        </Button>
        <Button variant="ghost" disabled>
            Правила и условия
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
