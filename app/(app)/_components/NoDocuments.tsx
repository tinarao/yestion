"use client";

import Image from "next/image";
import Empty from "@/public/documents/empty.png";
import EmptyDark from "@/public/documents/empty-dark.png";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

import Link from "next/link";
import ThemeToggle from "@/components/theming/ThemeToggle";

const NoDocuments = () => {

  const { theme } = useTheme();
  
  return (
    <div className="text-center">
      <ThemeToggle />
      <div className="w-fit mx-auto">
        {theme === "light" ? (
          <Image src={Empty} height={500} width={500} alt="Нет документов" />
        ) : (
          <Image
            src={EmptyDark}
            height={500}
            width={500}
            alt="Нет документов"
          />
        )}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Здесь пусто
        </h1>
        <Button asChild size="icon" className="my-4">
            <Link href="/documents" className="flex items-center">
              <PlusSquare className="size-4" />
            </Link>
          </Button>
      </div>    
    </div>
  );
};

export default NoDocuments;
