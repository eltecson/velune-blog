import { StandardProps } from "./helpers";

export interface Post {
  id: number;
  title: string;
  content: object;
  excerpt: string;
  slug: string;
  cover_image: string;
  status: "draft" | "published" | "scheduled"
  author_id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  dislikes_count: number;
  comments_count: number;
}

export interface PostSectionProps extends Omit<StandardProps, "children"> {
  id: string;
  sectionTitle: string;
  posts: Array<Post>;
}
