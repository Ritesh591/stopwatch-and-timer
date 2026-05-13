interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'relative w-14 h-7 rounded-full p-0.5 transition-colors duration-300',
        'focus-visible:outline-2 focus-visible:outline-(--color-accent)',
        isDark
          ? 'bg-(--color-accent)'
          : 'bg-(--color-surface-3) border border-(--color-border)',
      ].join(' ')}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 text-[11px] pointer-events-none">
        <span>🌙</span>
        <span>☀️</span>
      </span>

      {/* Thumb */}
      <span
        className={[
          'block w-6 h-6 rounded-full shadow-md transition-transform duration-300',
          isDark
            ? 'translate-x-7 bg-white'
            : 'translate-x-0 bg-white',
        ].join(' ')}
      />
    </button>
  );
}
