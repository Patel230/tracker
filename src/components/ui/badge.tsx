import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

export const badgeVariants = cva(
  "inline-flex items-center gap-1 border-[3px] border-brut-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-muted-foreground",
        outline: "bg-transparent text-foreground",
        destructive: "bg-destructive text-primary-foreground",
        solid: "bg-foreground text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
