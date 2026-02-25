import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        notification: "bg-violet-500 text-white",
        status: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
        meta: "bg-muted text-muted-foreground",
        category: "bg-primary text-primary-foreground",
        atomic: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
        stable: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
        beta: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
        experimental: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400",
        deprecated: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        tag: "bg-muted text-muted-foreground",
        owner: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400",
        since: "bg-muted text-muted-foreground font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
