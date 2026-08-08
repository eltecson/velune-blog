"use client"

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { StandardProps } from "@/types/helpers";
import { Post } from "@/types/posts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "../ui/link";

export default function FeaturedPost({
  className,
  ...props
}: StandardProps) {
  const supabase = createClient()
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null)

  useEffect(() => {
    const getFeaturedPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("likes_count", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error(error)
        toast.error("Fetching posts failed: " + error.message)
        throw error
      }

      setFeaturedPost(data)
    }
    getFeaturedPost()
  }, [])
  return (
    <div
      className={cn(
        "bg-primary border-b-1 border-foreground/50 w-full flex flex-col gap-[8px]",
        "sm:px-[80px] sm:flex-row sm:gap-[20px]",
        className
      )}
      {...props}
    >
      <h2 className="sr-only">
        Posts
      </h2>
      {featuredPost && (
        <>
          <Link href={"/posts/" + featuredPost.slug} className="flex-1">
            <Image
              src={featuredPost.cover_image} alt="Featured post cover image"
              width={630}
              height={400}
              className="w-full h-auto"
            />
          </Link>
          <div className={cn(
            "text-complementary flex flex-1 flex-col gap-[8px] px-[20px] pt-[16px] pb-[32px]",
            "sm:justify-center"
          )}>
            <Link href={"/posts/" + featuredPost.slug}>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight active:underline hover:underline underline-offset-4">
                {featuredPost.title}
              </h3>
            </Link>
            <p className="text-base leading-tight sm:text-xl">
              {featuredPost.excerpt}
            </p>
          </div>
        </>
      )}

    </div>
  )
}
