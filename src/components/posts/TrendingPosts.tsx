import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import PostSection from "./PostSection"

export default async function TrendingPosts() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("posts")
    .select()
    .order("likes_count", { ascending: false })
    .order("created_at", { ascending: false })
    .range(1, 4)

  if (error) {
    console.error(error)
    toast.error("Fetching posts failed: " + error.message)
    throw error
  }

  return (
    <PostSection id="trending" sectionTitle="Trending Now" posts={data} />
  )
}
