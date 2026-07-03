import { LinkProps } from "@/types/components"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export default function SidebarLink({
  children,
  className,
  href,
  ...props
}: LinkProps) {
  return (
    <Link href={href} {...props}>
      <motion.li
        variants={item}
        className={cn(
          "py-5 transition-colors duration-200 border-b border-foreground/50 text-base font-display text-center",
          className
        )}
      >
        {children}
      </motion.li>
    </Link>
  )
}

const item = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
}
