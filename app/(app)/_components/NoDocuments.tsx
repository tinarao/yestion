"use client";

import Image from "next/image";
import Empty from "@/public/documents/empty.png";
import EmptyDark from "@/public/documents/empty-dark.png";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import ThemeToggle from "@/components/theming/ThemeToggle";

import Link from "next/link";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const NoDocuments = () => {
  const { theme } = useTheme();
  const create = useMutation(api.documents.create);

  const createDocHandler = () => {
    const promise = create({ title: "Без названия" });
    toast.promise(promise, {
      loading: "Создаём документ...",
      success: "Документ создан!",
      error: "Не удалось создать документ 😔",
    });
  };

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
        <Button
          className="my-4 flex items-center gap-2 mx-auto"
          onClick={createDocHandler}
        >
          <>
            <PlusSquare className="size-4" />
            <span>Начать работу</span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default NoDocuments;
