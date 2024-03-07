"use client";

import Editor from "@/app/(app)/_components/Editor";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { update } from "@/convex/documents";
import { useMutation, useQuery } from "convex/react";

type DIPProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const DocumentIdPage = ({ params }: DIPProps) => {
  const document = useQuery(api.documents.getByID, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update)
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

  if (document === undefined) {
    return <div></div>;
  }

  if (document === null) {
    return <div>404</div>;
  }

  return (
    <div className="pb-40">
      {/* <div className="h-[35vh]" /> */}
      {/* <div className="py-8">
        <Toolbar initData={document} />
      </div> */}
      <div className="container">
        <h2 className="text-4xl">{document.title}</h2>
        <div className="py-4 pt-12 z-[99999]">
        <Editor
          initContent={document.content}
          onChange={onChange}
        />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
