"use client";

import { LucideIcon } from "lucide-react";

type ItemProps = {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
};

const Item = ({ onClick, label, icon: Icon }: ItemProps) => {
  return (
    <div
        onClick={onClick}
        role="button"
        className="pl-4 group min-h-[25px] text-sm py-2 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-semibold"
    >
        <Icon className="shrink-0 h-[15px] mr-2 text-muted-foreground" />
        <span className="truncate font-semibold">
            {label} 
        </span>
    </div>
  );
};

export default Item;
