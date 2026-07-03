"use client"

import Link from "@/components/ui/link";
import { LinkProps } from "@/types/components";
import { usePathname } from "next/navigation";

export default function NavbarLink({
  className,
  children,
  href,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const isPath = pathname === href;
  return (
    <Link href={href} className={`
      ${isPath ?
        "box-border border-b-2 border-accent text-accent" :
        "text-foreground/50"
      }
      flex items-center px-[4px] ${className}
    `}>
      {children}
    </Link>
  )
}
