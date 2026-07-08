"use client"

import RawVeluneLogo from "@/assets/logo.svg"
import RawWideLogo from "@/assets/wide-logo.svg"
import RawRegisterIllustration from "@/assets/register.svg"
import RawLoginIllustration from "@/assets/login.svg"
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

export function RegisterIllustration({
  className,
  ...props
}: IconProps) {
  return (
    <RawRegisterIllustration className={className} {...props}/>
  )
}

export function LoginIllustration({
  className,
  ...props
}: IconProps) {
  return (
    <RawLoginIllustration className={className} {...props}/>
  )
}
