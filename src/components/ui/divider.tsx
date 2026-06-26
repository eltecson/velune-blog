import { DividerProps } from "@/types/components";

export default function Divider({
  className,
  width,
  ...props
}: DividerProps) {
  return (
    <div
      className={`bg-foreground/50 ${className}`}
      style={{ width }}
      {...props}
    />
  )
}
