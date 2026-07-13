import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-brut-ink bg-primary text-primary-foreground shadow-[3px_3px_0_0_hsl(0_0%_0%)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(0_0%_0%)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_hsl(0_0%_0%)]",
        secondary:
          "border-2 border-brut-ink bg-muted text-muted-foreground shadow-[3px_3px_0_0_hsl(0_0%_0%)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(0_0%_0%)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_hsl(0_0%_0%)]",
        outline:
          "border-2 border-brut-ink bg-transparent text-foreground shadow-[3px_3px_0_0_hsl(0_0%_0%)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(0_0%_0%)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_hsl(0_0%_0%)]",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        destructive:
          "border-2 border-brut-ink bg-destructive text-destructive-foreground shadow-[3px_3px_0_0_hsl(0_0%_0%)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(0_0%_0%)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_hsl(0_0%_0%)]",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
