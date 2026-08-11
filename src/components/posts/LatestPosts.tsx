import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import PostSection from "./PostSection"

export default async function LatestPosts() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    console.error(error)
    toast.error("Fetching posts failed: " + error.message)
    throw error
  }

  return (
    <PostSection id="latest" sectionTitle="Latest Articles" posts={data} />
  )
}
