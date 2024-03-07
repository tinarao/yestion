"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useSettings from "@/hooks/useSettings";
import { Label } from "../ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ThemeToggle from "../theming/ThemeToggle";
import { ReactNode } from "react";

type SMProps = {
  children: ReactNode;
};

const SettingsModal = ({ children }: SMProps) => {
  const settings = useSettings();

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="z-[99999] bg-neutral-100 dark:bg-neutral-700">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>Внешний вид</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Кастомизация внешнего вида приложения
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;