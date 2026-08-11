import { cn } from "@/lib/utils";
import { StandardProps } from "@/types/helpers";

export default function VerticalLine({
  className,
  ...props
}: StandardProps) {
  return (
    <div
      className={cn(
        "hidden sm:block min-w-[1px] min-h-screen fixed bg-muted-foreground md:left-11 lg:left-20 top-0 z-10",
        className
      )}
      {...props}
    />
  )
}
