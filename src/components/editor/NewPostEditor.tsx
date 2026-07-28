"use client";

import { StandardProps } from "@/types/helpers";
import dynamic from "next/dynamic";
import BlockNoteEditorSkeleton from "./BlockNoteEditorSkeleton";

const BlockNoteEditor = dynamic(
  () => import("./BlockNoteEditor"),
  {
    ssr: false,
    loading: () => (
      <BlockNoteEditorSkeleton />
    ),
  },
);

export default function NewPostEditor({ className } : StandardProps) {
  return <BlockNoteEditor className={className}/>;
}
