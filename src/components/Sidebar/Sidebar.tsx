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

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="flex items-center justify-center self-center cursor-pointer"
          size="icon-sm"
        >
          <RiMenuLine className="w-[32px] h-[32px] [&_svg]:size-8" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="min-w-screen min-h-screen"
      >
        <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation links to pages: Login, Register
        </SheetDescription>

        {ctaNavigation.map((item) => {
          return (
            <ul key={item.href} className="flex flex-col items-stretch justify-center w-auto text-center min-h-full">
              <SidebarLink href={item.href} className={item.href === "/register" ? "text-background bg-accent" : ""}>{item.title}</SidebarLink>
            </ul>
          )
        })}
      </SheetContent>
    </Sheet>
  )
}
