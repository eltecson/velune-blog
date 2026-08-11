import FeaturedPost from "@/components/posts/FeaturedPost";
import LatestPosts from "@/components/posts/LatestPosts";
import TrendingPosts from "@/components/posts/TrendingPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts"
}

export default function Posts() {
  return (
    <main className="flex flex-col flex-1 font-sans min-h-screen bg-background">
      <h1 className="sr-only">Posts</h1>
      <FeaturedPost />
      <TrendingPosts />
      <LatestPosts />
    </main>
  );
}
