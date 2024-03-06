"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import DocumentTitle from "./DocumentTitle";

type TBProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const TopBar = ({ isCollapsed, onResetWidth }: TBProps) => {

    const params = useParams();
    const document = useQuery(api.documents.getByID, {
        documentId: params.documentId as Id<"documents">
    });

    if (document === undefined) {
        // TODO: add skeleton later
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
                <DocumentTitle.Skeleton />
            </nav>
        )
    }
    if (document === null) {
        return null
    }

    return (
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-4">
            {isCollapsed && (
                <MenuIcon 
                    role="button"
                    onClick={onResetWidth}
                    className="size-6 text-muted-foreground"
                />
            )}
            <div className="flex items-center justify-between w-full">
                <h2 className="text-4xl">
                    <DocumentTitle 
                        initData={document}
                    />
                </h2>
            </div>
        </nav>
    );
};

export default TopBar;
