interface TimeDisplayProps {
  main: string;
  sub?: string;
  label?: string;
  finished?: boolean;
  running?: boolean;
}

export function TimeDisplay({ main, sub, label, finished = false, running = false }: TimeDisplayProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center py-10 px-6 rounded-3xl
        bg-(--color-surface) border border-(--color-border)
        shadow-[0_8px_40px_rgba(124,58,237,0.08)]
        transition-all duration-300"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Subtle glow ring while running */}
      {running && (
        <span className="absolute inset-0 rounded-3xl ring-2 ring-(--color-accent)/40 animate-pulse pointer-events-none" />
      )}

      {label && (
        <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-(--color-text-muted)">
          {label}
        </p>
      )}

      <div
        className={[
          'font-mono tabular-nums leading-none select-none transition-colors duration-300',
          finished
            ? 'text-emerald-400'
            : running
              ? 'text-(--color-accent)'
              : 'text-(--color-text)',
          sub ? 'text-[5.5rem] sm:text-[7rem]' : 'text-[5rem] sm:text-[6.5rem]',
        ].join(' ')}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {main}
        {sub !== undefined && (
          <span className="text-[2.2rem] sm:text-[3rem] text-(--color-text-muted) ml-0.5">
            .{sub}
          </span>
        )}
      </div>

      {finished && (
        <p className="mt-3 text-sm font-semibold text-emerald-400 tracking-wide animate-bounce">
          Time's up!
        </p>
      )}
    </div>
  );
}
