import { NavbarIconProps } from "@/types/components";

export default function NavbarIcon({
  className,
  Icon,
  ...props
}: NavbarIconProps) {
  return (
    <Icon className={`w-[32px] h-[32px] ${className}`} />
  )
}
