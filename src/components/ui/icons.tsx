"use client"

import RawVeluneLogo from "@/assets/logo.svg"
import { IconProps } from "@/types/components"

export function VeluneLogo({
  className,
  ...props
}: IconProps) {
  return (
    <RawVeluneLogo className={className} {...props}/>
  )
}
