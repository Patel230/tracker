import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex w-full border-[3px] border-brut-ink bg-input px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70",
        props["aria-invalid"] && "border-destructive",
        className,
      )}
      {...props}
    />
  )
}
