"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"

export default function RedirectButtons() {
  const router = useRouter()
  return (
    <div className="flex gap-4 mt-8 md:m-0">
      <Button
        onClick={() => router.push("/")}
        className="text-base font-medium normal-case rounded-sm bg-primary px-5 py-2 text-primary-foreground hover:opacity-90"
      >
        Go Home
      </Button>
      <Button
        onClick={() => {
          router.back()
          router.refresh()
        }}
        className="text-base font-medium normal-case rounded-sm border-1 border-foreground px-5 py-2 text-foreground hover:opacity-90"
      >
        Back
      </Button>
    </div>
  )
}
