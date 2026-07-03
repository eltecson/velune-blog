import { cn } from "@/lib/utils";
import { NavbarIconProps } from "@/types/components";

export default function NavbarIcon({
  className,
  Icon,
  ...props
}: NavbarIconProps) {
  return (
    <Icon className={cn("w-[32px] h-[32px]", className)} />
  )
}
