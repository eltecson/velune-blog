import { cn } from "@/lib/utils";
import { NavbarIconProps } from "@/types/components";

export default function NavbarIcon({
  className,
  Icon,
  ...props
}: NavbarIconProps) {
  return (
    <Icon className={cn("size-8 shrink-0", className)} />
  )
}
