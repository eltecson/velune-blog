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
        "border-b-2 border-solid border-accent text-accent" :
        "text-foreground/50"
      }
      flex items-center px-[6px] ${className}
    `}>
      {children}
    </Link>
  )
}
