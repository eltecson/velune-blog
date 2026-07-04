"use client"

import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { LinkProps } from "@/types/components";
import { usePathname } from "next/navigation";

export default function NavbarLink({
  className,
  children,
  href,
  title,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const isPath = pathname === href;
  return (
    <Link href={href} className={cn(`
      ${isPath ?
        "box-border border-b-2 border-accent md:border-none text-accent" :
        "text-foreground/50 transition-colors duration-200 hover:text-foreground/80 active:text-foreground/80"
      }
      flex flex-col items-center justify-center px-[4px] md:px-[20px]`,
      className
    )}>
      {children}
      <p className="hidden md:block text-[12px] font-display">
        {title}
      </p>
    </Link>
  )
}
