interface Props {
  size?: number;
  showText?: boolean;
  className?: string;
  // Defaults to the light-on-dark brut-ink color, which is wrong on a light
  // (e.g. bg-primary) panel — callers on a light background pass an override.
  textClassName?: string;
}

export default function Logo({ size = 28, showText = true, className = "", textClassName = "text-brut-ink" }: Props) {
  const s = size;
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tracker logo">
        <rect x="2" y="2" width="28" height="28" rx="0" fill="var(--color-primary)" stroke="var(--color-primary-foreground)" strokeWidth="3" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="var(--color-primary-foreground)" strokeWidth="3" />
        <circle cx="16" cy="16" r="2" fill="var(--color-primary-foreground)" />
        <line x1="6" y1="16" x2="12" y2="16" stroke="var(--color-primary-foreground)" strokeWidth="3" />
        <line x1="20" y1="16" x2="26" y2="16" stroke="var(--color-primary-foreground)" strokeWidth="3" />
        <line x1="16" y1="6" x2="16" y2="12" stroke="var(--color-primary-foreground)" strokeWidth="3" />
        <line x1="16" y1="20" x2="16" y2="26" stroke="var(--color-primary-foreground)" strokeWidth="3" />
      </svg>
      {showText && (
        <span className={`text-lg font-extrabold uppercase tracking-tight ${textClassName}`}>
          Tracker<span className="text-brut-rejected">.</span>
        </span>
      )}
    </div>
  );
}
