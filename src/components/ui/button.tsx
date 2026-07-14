import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[3px] border-brut-ink bg-primary text-primary-foreground shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]",
        secondary:
          "border-[3px] border-brut-ink bg-card text-foreground shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]",
        outline:
          "border-[3px] border-brut-ink bg-transparent text-foreground shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]",
        ghost:
          "text-foreground hover:bg-card",
        link: "text-foreground underline-offset-4 hover:underline",
        destructive:
          "border-[3px] border-brut-ink bg-destructive text-primary-foreground shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]",
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
