import z from "zod"

export const PostSchema = z.object({
  title: z.string()
    .min(8, "Title too short, needs atleast 8 characters")
    .max(50, "Title too long, can only take up to 50 characters"),
  content: z
    .array(z.unknown(), "Content cannot be empty")
    .min(1, "Content cannot be empty"),
  excerpt: z.string()
    .min(20, "Excerpt too short, needs atleast 20 characters")
    .max(300, "Excerpt too long, can only take up to 300 characters"),
  cover_image: z
    .string()
    .url("Cover image must be a valid URL")
    .refine(
      (url) =>
        /^https:\/\/.+\.supabase\.co\/storage\/v1\/object\/public\//.test(url),
      "Cover image must be a public Supabase Storage URL"
    ),
  status: z.enum(["draft", "published", "scheduled"])
})
