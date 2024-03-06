"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";

import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

type EditorProps = {
  onChange?: (value: string) => void;
  initContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, initContent, editable }: EditorProps) => {
  
    const { resolvedTheme } = useTheme()

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initContent ? JSON.parse(initContent) as PartialBlock[] : undefined,
    })

    return (
        <BlockNoteView 
            editor={editor} 
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    )
};

export default Editor;
