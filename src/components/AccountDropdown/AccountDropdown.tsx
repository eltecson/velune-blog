import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiArrowDropDownFill } from "@remixicon/react";
import { AccountDropdownProps } from "@/types/components";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function AccountDropdown({
  className,
  account
}: AccountDropdownProps) {
  const router = useRouter()

  const handleLogout = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      const { message } = await res.json()

      if (!res.ok) {
        toast.error(message, {
          position: "bottom-center",
        })
        return
      }

      toast.success(message, {
        position: "bottom-center",
      })

      router.replace("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)

      toast.error("Failed to log out. Please try again.", {
        position: "bottom-center",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        `text-foreground flex flex-col items-center justify-center px-[4px] md:px-[20px]`,
        className
      )}>
        <Image
          width="32"
          height="32"
          src={account.avatarSrc} alt="Profile image"
          className="w-[32px] h-[32px] rounded-full"
          loading="eager"
        />
        <div className="hidden md:flex items-center">
          <p className="text-[12px] font-display">
            Me
          </p>
          <RiArrowDropDownFill className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Write a new post</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
