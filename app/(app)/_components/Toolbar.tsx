"use client"

import IconPicker from "@/components/IconPicker"
import { Button } from "@/components/ui/button"
import { Doc } from "@/convex/_generated/dataModel"
import { SmileIcon, XIcon } from "lucide-react"

type TBProps = {
    initData: Doc<"documents">
    preview?: boolean
}

const Toolbar = ({ initData, preview }: TBProps) => {
  return (
    <div className="bg-red-400 group">
        {!!initData.icon && !preview && (
            <div className="flex items-center gap-x-2 group/icon">
              <IconPicker onChange={() => {}}>
                <p className="text-6xl hover:opacity-75 transition">
                  {initData.icon}
                </p>
              </IconPicker>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => {}} 
                className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              >
                <XIcon className="size-4" />
              </Button>
            </div>
        )}
        {!!initData.icon && preview && (
          <p className="text-6xl pt-6">
            {initData.icon}
          </p>
        )}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!initData.icon && !preview && (
            <IconPicker asChild onChange={() => {}}>
              <Button className="text-muted-foregound text-xs" variant="outline" size="sm">
                <SmileIcon className="size-4 mr-2" />
                Добавить иконку
              </Button>
            </IconPicker>
          )}
        </div>
    </div>
  )
}

export default Toolbar