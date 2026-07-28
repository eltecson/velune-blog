"use client";

import * as Button from "@/components/ui/button"
import * as DropdownMenu from "@/components/ui/dropdown-menu"
import * as Input from "@/components/ui/input"
import * as Label from "@/components/ui/label"
import * as Select from "@/components/ui/select"
import * as Popover from "@/components/ui/popover"
import * as Card from "@/components/ui/card"
import * as Tooltip from "@/components/ui/tooltip"
import * as Tabs from "@/components/ui/tabs"
import * as Toggle from "@/components/ui/toggle"
import * as Badge from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { StandardProps } from "@/types/helpers";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDropzone } from "react-dropzone"
import { RiDeleteBinLine, RiImageLine } from "@remixicon/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function BlockNoteEditor({
  className
}: StandardProps) {
  const editor = useCreateBlockNote();
  const [file, setFile] = useState<File | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: ([file]) => {
      setFile(file ?? null);
    },
  });

  return (
    <div className={cn("flex flex-col gap-[10px] sm:gap-5", className)}>
      <TextareaAutosize
        placeholder="Title"
        className="w-full resize-none border-none bg-transparent text-3xl sm:text-5xl font-bold outline-none"
        autoFocus
      />

      <TextareaAutosize
        placeholder="Description"
        className="w-full resize-none border-none bg-transparent text-lg sm:text-2xl text-foreground outline-none"
      />

      {file ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt="Cover preview"
            className="w-full h-auto rounded-lg object-cover"
          />

          <Button.Button
            onClick={() => setDeleteDialogOpen(true)}
            className="absolute right-5 top-5 bg-background/20 rounded-full"
            size="icon-sm"
          >
            <RiDeleteBinLine className="text-complementary cursor-pointer size-6" />
          </Button.Button>
        </div>
      ) : (
        <div {...getRootProps()} className="h-[250px] sm:h-[400px] border border-2 border-dashed border-muted-foreground text-foreground flex flex-col justify-center items-center gap-3 px-5 cursor-pointer">
          <input {...getInputProps()} />

          <RiImageLine className="size-15 sm:size-30 text-muted-foreground" />

          <p className="text-muted-foreground text-center leading-tight font-medium text-base sm:text-xl">
            Drag and drop a cover image here, or click to select one.
          </p>
        </div>
      )}

      <BlockNoteView
        editor={editor}
        shadCNComponents={{
          Button,
          DropdownMenu,
          Input,
          Label,
          Select,
          Popover,
          Card,
          Tooltip,
          Tabs,
          Toggle,
          Badge,
        }}
        className="w-full text-base -translate-x-10"
      />

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm deletion
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this cover image?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row justify-end">
            <Button.Button onClick={() => {
              setFile(null)
              setDeleteDialogOpen(false)
            }} className="bg-good text-complementary">
              Yes
            </Button.Button>

            <DialogClose asChild>
              <Button.Button className="bg-bad text-complementary">
                No
              </Button.Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
