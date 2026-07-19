import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import SidebarLink from "./SidebarLink"
import { RiMenuLine } from "@remixicon/react"
import { ctaNavigation } from "@/constants/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { StandardProps } from "@/types/helpers"
import { cn } from "@/lib/utils"

export default function Sidebar({
  className
}: StandardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className={cn(
            `flex items-center justify-center self-center cursor-pointer md:hidden`,
            className
          )}
          size="icon-sm"
        >
          <RiMenuLine className="w-[32px] h-[32px] [&_svg]:size-8" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="min-w-screen min-h-screen bg-background/50 backdrop-blur-sm"
      >
        <motion.nav
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation links to pages: Login, Register
          </SheetDescription>

          <motion.ul
            variants={list}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center min-h-full px-[20px]"
          >
            {ctaNavigation.map((link) => (
              <SidebarLink key={link.href} href={link.href} className={link.href === "/register" ? "border-1 border-foreground active:border-accent active:bg-accent active:text-background" : "active:text-foreground/50"}>
                {link.title}
              </SidebarLink>
            ))}
          </motion.ul>
        </motion.nav>
      </SheetContent>
    </Sheet>
  )
}

const list = {
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}
