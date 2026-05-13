interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary: [
    'bg-(--color-accent) hover:bg-(--color-accent-dark) text-white',
    'shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-(--color-surface-2) hover:bg-(--color-surface-3) text-(--color-text)',
    'border border-(--color-border)',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
  danger: [
    'bg-red-500/10 hover:bg-red-500/20 text-red-500',
    'border border-red-500/30',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
};

export function ControlButton({
  onClick,
  disabled = false,
  variant = 'primary',
  children,
  className = '',
}: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-2xl',
        'px-7 py-3.5 text-sm font-semibold tracking-wide',
        'transition-all duration-200 active:scale-95 select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
