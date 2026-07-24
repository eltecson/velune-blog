"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiArrowDropDownFill, RiLogoutBoxRLine, RiPencilLine, RiSettings2Line, RiUserLine } from "@remixicon/react"
import { AccountDropdownProps } from "@/types/components"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { MouseEvent, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

export default function AccountDropdown({
  className,
  account,
}: AccountDropdownProps) {
  const router = useRouter()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

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

      setLogoutDialogOpen(false)

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "text-foreground flex flex-col items-center justify-center px-[4px] md:px-[20px]",
            className
          )}
        >
          <Image
            width={32}
            height={32}
            src={account.avatarSrc}
            alt="Profile image"
            className="size-[32px] rounded-full"
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
            <DropdownMenuLabel>
              <p>My Account</p>
            </DropdownMenuLabel>

            <DropdownMenuItem>
              <RiUserLine />
              <p>Profile</p>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <RiPencilLine />
              <p>Write a new post</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <RiSettings2Line />
              <p>Settings</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setLogoutDialogOpen(true)
              }}
            >
              <RiLogoutBoxRLine />
              <p>Log out</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm logout
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to log out?
              You’ll need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleLogout} className="bg-good text-complementary">
              Yes
            </Button>

            <DialogClose asChild>
              <Button className="bg-bad text-complementary">
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
