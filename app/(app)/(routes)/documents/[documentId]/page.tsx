"use client";

import Editor from "@/app/(app)/_components/Editor";
import Toolbar from "@/app/(app)/_components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type DIPProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const DocumentIdPage = ({ params }: DIPProps) => {
  const document = useQuery(api.documents.getByID, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div></div>;
  }

  if (document === null) {
    return <div>404</div>;
  }

  return (
    <div className="pb-40">
      {/* <div className="h-[35vh]" /> */}
      <div className="bg-blue-400 py-8">
        <Toolbar initData={document} />
      </div>
      <div className="container">
        <h2 className="text-4xl">{document.title}</h2>
        <div className="py-4">
        <Editor
          initContent={document.content}
        />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
