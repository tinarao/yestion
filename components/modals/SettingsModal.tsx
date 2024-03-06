"use client"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import useSettings from "@/hooks/useSettings"
import { Label } from "../ui/label"
import { DialogTrigger } from "@radix-ui/react-dialog"
import ThemeToggle from "../theming/ThemeToggle"

const SettingsModal = () => {

    const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogHeader className="border-b pb-4">
            <h3 className="text-lg font-semibold">
                Настройки
            </h3>
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
    </Dialog>
  )
}

export default SettingsModal