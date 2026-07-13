interface Props {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 28, showText = true, className = "" }: Props) {
  const s = size;
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tracker logo">
        <rect x="2" y="2" width="28" height="28" rx="0" fill="#FFD60A" stroke="#111" strokeWidth="3" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="#111" strokeWidth="3" />
        <circle cx="16" cy="16" r="2" fill="#111" />
        <line x1="6" y1="16" x2="12" y2="16" stroke="#111" strokeWidth="3" />
        <line x1="20" y1="16" x2="26" y2="16" stroke="#111" strokeWidth="3" />
        <line x1="16" y1="6" x2="16" y2="12" stroke="#111" strokeWidth="3" />
        <line x1="16" y1="20" x2="16" y2="26" stroke="#111" strokeWidth="3" />
      </svg>
      {showText && (
        <span className="text-lg font-extrabold uppercase tracking-tight text-brut-ink">
          Tracker<span className="text-brut-rejected">.</span>
        </span>
      )}
    </div>
  );
}
