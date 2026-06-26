import { LinkProps } from "@/types/components"
import NextLink from "next/link"

export default function Link({ children, className, ...rest }: LinkProps) {
  return (
    <NextLink {...rest} rel="noopener noreferrer" className={className}>
      {children}
    </NextLink>
  )
}
