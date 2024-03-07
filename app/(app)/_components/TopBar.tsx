"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ImagePlus, MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import DocumentTitle from "./DocumentTitle";
import IconPicker from "@/components/IconPicker";
import { Button } from "@/components/ui/button";
import CoverImageModal from "@/components/modals/CoverImageModal";

type TBProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const TopBar = ({ isCollapsed, onResetWidth }: TBProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getByID, {
    documentId: params.documentId as Id<"documents">,
  });

  const updateIcon = useMutation(api.documents.update);
  const onIconChange = (icon: string) => {
    updateIcon({
      id: params.documentId as Id<"documents">,
      icon: icon,
    });
  };

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        <DocumentTitle.Skeleton />
      </nav>
    );
  }
  if (document === null) {
    return null;
  }

  return (
    <div className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between border-b">
      <nav className="bg-background dark:bg-[#1F1F1F] flex items-center gap-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="size-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <h2 className="text-4xl">
            <DocumentTitle initData={document} />
          </h2>
        </div>
      </nav>
      <div className="flex gap-4">
        <div>
          <CoverImageModal className="flex gap-2">
            {/* Позже поменять на context-menu */}
            <div 
              className="flex gap-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <ImagePlus className="text-muted-foreground" />
              Загрузить изображение
            </div>
          </CoverImageModal>
        </div>
        <div>
          <IconPicker onChange={(icon) => onIconChange(icon)}>
            <Button variant="ghost">Сменить иконку</Button>
          </IconPicker>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
