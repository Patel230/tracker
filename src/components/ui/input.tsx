import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full border-[3px] border-brut-ink bg-input px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        props["aria-invalid"] && "border-destructive",
        className,
      )}
      {...props}
    />
  )
}
