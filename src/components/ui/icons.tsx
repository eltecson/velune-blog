"use client"

import RawVeluneLogo from "@/assets/logo.svg"
import RawWideLogo from "@/assets/wide-logo.svg"
import { IconProps } from "@/types/components"

export function VeluneLogo({
  className,
  ...props
}: IconProps) {
  return (
    <RawVeluneLogo className={className} {...props}/>
  )
}

export function WideLogo({
  className,
  ...props
}: IconProps) {
  return (
    <RawWideLogo className={className} {...props}/>
  )
}
