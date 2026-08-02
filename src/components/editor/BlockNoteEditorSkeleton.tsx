"use client";

import * as Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { StandardProps } from "@/types/helpers";

export default function BlockNoteEditorSkeleton({
  className,
}: StandardProps) {
  return (
    <div className={cn("flex flex-col gap-[10px] sm:gap-5", className)}>
      {/* Title */}
      <Skeleton className="h-10 sm:h-14 w-2/3 rounded-md" />

      {/* Description */}
      <Skeleton className="h-7 sm:h-8 w-1/2 rounded-md" />

      {/* Cover Image */}
      <Skeleton className="h-[250px] sm:h-[400px] w-full rounded-lg" />

      {/* Editor */}
      <div className="-translate-x-10 flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            {/* Side menu buttons */}
            <div className="flex gap-[1px] pt-1">
              <Skeleton className="size-7 rounded-md" />
              <Skeleton className="size-7 rounded-md" />
            </div>

            {/* Block content */}
            <div className="flex-1 space-y-2">
              <Skeleton
                className={cn(
                  "h-5 rounded-md",
                  i % 4 === 0 && "w-1/3",
                  i % 4 === 1 && "w-full",
                  i % 4 === 2 && "w-5/6",
                  i % 4 === 3 && "w-2/3"
                )}
              />

              {i === 2 && (
                <Card.Card className="p-4">
                  <Skeleton className="aspect-video w-full rounded-md" />
                </Card.Card>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
