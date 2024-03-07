"use client";

import CoverImageModal from "@/components/modals/CoverImageModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type CIProps = {
    url?: string;
};

const CoverImage = ({ url }: CIProps) => {

  const params = useParams()
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const removeCoverImageHandler = async () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">
    })
    toast.success("Удалено!")
  }

  return (
    <div 
        className={`relative h-[35vh] w-full group ${!url && "h-[12vh] bg-neutral-200"} ${url && "bg-muted"}`}
    >
        {!!url && (
            <Image
                src={url}
                fill
                alt="Обложка"
                className="object-cover"
             />
        )}
        {!!url && (
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">

              <Button size="sm" onClick={removeCoverImageHandler} variant="outline" className="text-muted-foreground text-sm">
                <X className="size-4 mr-2" /> Удалить
              </Button>

            <CoverImageModal>
              <Button size="sm" onClick={() => {}} variant="outline" className="text-muted-foreground text-sm">
                <ImageIcon className="size-4 mr-2" /> Изменить
              </Button>
            </CoverImageModal>
          </div>
        )}
    </div>
  )
};

export default CoverImage;
