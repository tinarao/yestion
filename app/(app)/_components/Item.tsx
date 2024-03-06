"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { create } from '../../../convex/documents';
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ItemProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
};

const Item = ({
  id,
  onClick,
  label,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {

  const create = useMutation(api.documents.create);
  const router = useRouter();

  const handleExpand = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onExpand?.();
  }

  const onCreate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (!id) return;

    const promise = create({ title: "Без названия", parentDocument: id })
      .then((docID) => {
        if (!expanded) {
          onExpand?.();
        }

        // router.push(`/documents/${docID}`)
      })

    toast.promise(promise, {
      loading: "Создаём...",
      success: "Документ создан!",
      error: "Произошла ошибочка 😭"
    })
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  // literally unreadable
  // TODO: Refactor

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 24}` : "12px",
      }}
      className={`pl-4 group min-h-[25px] text-sm py-2 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-semibold ${
        active && "bg-primary/5 text-primary"
      }`}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="size-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[15px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate font-semibold">{label}</span>
      {isSearch && (
        <kbd className="ml-auto text-xs pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="px-1 py-0 border">Ctrl</span> +{" "}
          <span className="px-1 py-0 border">K</span>
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate} 
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
          <Plus className="size-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: {level?:number}) {
  return (
    <div 
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px"}}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="size-4" />
      <Skeleton className="size-4 w-[30%]" />
    </div>
  )
}

export default Item;

