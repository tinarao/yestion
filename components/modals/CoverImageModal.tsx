"use client";

import { SingleImageDropzone } from "@/app/(app)/_components/ImageUploadDND";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

const CoverImageModal = ({ children, className }: { children: ReactNode, className?: string }) => {
  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      })

      onClose()
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="z-[99999] bg-neutral-100 dark:bg-neutral-700">
        <DialogHeader>
          <h3 className="font-semibold text-lg">Обложка</h3>
        </DialogHeader>
        <SingleImageDropzone 
          className="outline-none" 
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
