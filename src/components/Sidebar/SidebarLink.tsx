import { LinkProps } from "@/types/components"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"

export default function SidebarLink({
  children,
  className,
  href,
}: LinkProps) {
  return (
    <Link href={href}>
      <li
        className={cn("py-5 transition-colors duration-200 border-b border-foreground/50 text-base font-display", className)}
      >
        {children}
      </li>
    </Link>
  )
}
