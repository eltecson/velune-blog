import { cn } from "@/lib/utils";
import { PostSectionProps } from "@/types/posts";
import Link from "@/components/ui/link";
import Image from "next/image";

export default function PostSection({
  className,
  id,
  sectionTitle,
  posts,
  ...props
}: PostSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col relative border-b-1 border-muted-foreground",
        className
      )}
      {...props}
    >
      <h2 className="px-[20px] py-[4px] border-t-2 border-b-1 border-muted-foreground font-bold text-base tracking-wider font-display leading-tight md:absolute md:top-[96px] md:-left-[66px] md:rotate-90 md:text-xl lg:text-2xl md:border-none md:font-normal">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 gap-[20px] py-[32px] px-[20px] md:pl-[64px] lg:pr-[80px] lg:pl-[100px] lg:grid-cols-2">
        {posts.map(post => (
          <article key={post.id} className="flex flex-row gap-[16px]">
            <Link href={"/posts/" + post.slug} className="flex-1">
              <Image
                src={post.cover_image} alt="Post cover image"
                width={630}
                height={400}
                className="w-full h-auto md:h-full md:w-full object-cover aspect-4/3"
              />
            </Link>
            <div className="flex-1 flex flex-col gap-[16px]">
              <Link href={"/posts/" + post.slug}>
                <h3 className="text-base font-bold leading-tight active:underline hover:underline underline-offset-2 md:text-xl">
                  {post.title}
                </h3>
              </Link>
              <p className="hidden md:block text-foreground/80 leading-tight">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
