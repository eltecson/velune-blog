import NewPostEditor from "@/components/editor/NewPostEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Post",
};

export default function NewPostPage() {
  return (
    <main className="flex min-h-screen flex-1 bg-background font-sans px-5 pt-9 pb-50 sm:px-50">
      <div className="mx-auto w-full max-w-3xl min-h-[60vh] flex flex-col gap-5">
        <h1 className="text-[20px] font-medium font-display">
          New Post
        </h1>
        <NewPostEditor />
      </div>

    </main>
  );
}
