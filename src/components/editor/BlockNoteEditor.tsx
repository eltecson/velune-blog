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
import { useEffect, useState } from "react";
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
import { PostProps, SaveStatus } from "@/types/components";
import { createClient } from "@/lib/supabase/client";
import { useDebouncedCallback } from "use-debounce"
import { AuthUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostSchema } from "@/constants/editor";

export default function BlockNoteEditor({
  className
}: StandardProps) {
  const editor = useCreateBlockNote();

  const [file, setFile] = useState<File | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)

  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<PostProps>({
    title: "",
    content: {},
    excerpt: "",
    cover_image: "",
    status: "draft"
  });
  const [status, setStatus] = useState<SaveStatus>("Saved")
  const [ user, setUser ] = useState<AuthUser | null>(null);
  const supabase = createClient();
  const router = useRouter()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: ([file]) => {
      setFile(file ?? null);
      uploadFile(file)
    },
  });

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    return user
  }

  useEffect(() => {
    return editor.onChange(() => {
      setPost((prev) => ({
        ...prev,
        content: editor.document,
      }));
    });
  }, [editor]);

  function isSafeData() {
    const parsed = PostSchema.safeParse(post)

    const parsedPost = parsed
    if (!parsedPost.success) {
      toast.error(
        "Publishing failed: " +
        parsedPost.error.issues[0].message,
        { position: "bottom-center" }
      )
      return false
    }
    return true
  }

  async function save(mode: "auto" | "manual") {
    setStatus(mode === "auto" ? "Autosaving" : "Saving");

    const currentUser = user ?? await getUser();

    if (postId === null) {
      const { data, error } = await supabase
        .from("posts")
        .insert({ ...post, author_id: currentUser!.id })
        .select("id")
        .single();

      if (error) throw error;

      setPostId(data.id);
      setStatus(mode === "auto" ? "Autosaved" : "Saved");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({ ...post, author_id: currentUser!.id })
      .eq("id", postId);

    if (error) throw error;

    setStatus(mode === "auto" ? "Autosaved" : "Saved");
  }

  async function publish() {
    if (!isSafeData()) return
    try {
      const currentUser = user ?? await getUser();

      const { error } = await supabase
        .from("posts")
        .update({
          ...post,
          status: "published",
          published_at: new Date().toISOString(),
          author_id: currentUser!.id
        })
        .eq("id", postId);

      if (error) throw error

      toast.success("Post successfully published!", { position: "bottom-center" })
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Publishing failed: " + error)
      toast.error("Publishing failed: " + error, { position: "bottom-center" })
    } finally {
      setPublishDialogOpen(false)
    }
  }

  async function uploadFile(file: File) {
    try {
      const bucket = "uploads";
      const path = `images/${crypto.randomUUID()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      setPost(prev => ({
        ...prev, cover_image: publicUrl
      }))
    } catch (error) {
      console.error("Upload failed: ", error);
      toast.error("Upload failed: " + error, { position: "bottom-center" });
      throw error;
    }
  }

  async function removeFile(publicUrl: string) {
    try {
      const path = publicUrl.split("/uploads/")[1];

      const { error } = await supabase.storage
        .from("uploads")
        .remove([path]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Remove failed: ", error);
      toast.error("Remove failed: " + error, { position: "bottom-center" });
      throw error;
    }
  }

  const debouncedSave = useDebouncedCallback(() => {
    save("auto");
  }, 1000);

  useEffect(() => {
    setStatus("Unsaved");
    debouncedSave();
  }, [post]);

  return (
    <div className={cn("flex flex-col gap-[10px] sm:gap-5", className)}>
      <TextareaAutosize
        id="post-title"
        name="post-title"
        placeholder="Title"
        className="w-full resize-none border-none bg-transparent text-3xl sm:text-5xl font-bold outline-none"
        onChange={(e) => setPost(prev => ({
          ...prev, title: e.target.value})
        )}
        autoFocus
      />

      <TextareaAutosize
        id="post-excerpt"
        name="post-excerpt"
        placeholder="Excerpt"
        className="w-full resize-none border-none bg-transparent text-lg sm:text-2xl text-foreground outline-none"
        onChange={(e) => setPost(prev => ({
          ...prev, excerpt: e.target.value})
        )}
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
        <div {...getRootProps()} className="h-[250px] sm:h-[400px] rounded-lg border border-2 border-dashed border-muted-foreground text-foreground flex flex-col justify-center items-center gap-3 px-5 cursor-pointer">
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
        className="w-[calc(100%+2.5rem)] sm:w-[calc(100%+5rem)] text-base -translate-x-10 mb-25"
      />

      <div className="self-end flex gap-1 items-center">
        <Button.Button
          className="normal-case font-normal text-base sm:text-xl tracking-normal"
          onClick={() => {
            debouncedSave.cancel()
            save("manual")
          }}
        >
          {status !== "Error" ? ["Saving", "Autosaving"].includes(status) ? status + "..." : status : "Unsaved"}
        </Button.Button>
        <Button.Button
          className="border border-1 border-good text-good normal-case font-normal text-base sm:text-xl tracking-normal"
          onClick={() => setPublishDialogOpen(true)}
        >
          Publish
        </Button.Button>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete this cover image?
            </DialogTitle>

            <DialogDescription>
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row justify-end">
            <Button.Button onClick={async () => {
              setFile(null)
              setDeleteDialogOpen(false)
              await removeFile(post.cover_image)
              setPost(prev => ({
                ...prev,
                cover_image: ""
              }))
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

      <Dialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Publish post now?
            </DialogTitle>

            <DialogDescription>
              Make sure there is title, excerpt, and cover image before publishing.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row justify-end">
            <Button.Button onClick={() => publish()} className="bg-good text-complementary">
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
