export type Mode = 'stopwatch' | 'timer';

interface ModeTabsProps {
  mode: Mode;
  onChange: (m: Mode) => void;
}

const tabs: { id: Mode; label: string; icon: string }[] = [
  { id: 'stopwatch', label: 'Stopwatch', icon: '⏱' },
  { id: 'timer', label: 'Timer', icon: '⏲' },
];

export function ModeTabs({ mode, onChange }: ModeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="App mode"
      className="flex gap-1 p-1 rounded-2xl bg-(--color-surface-2) border border-(--color-border) w-fit mx-auto"
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={mode === tab.id}
          onClick={() => onChange(tab.id)}
          className={[
            'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold',
            'transition-all duration-200 focus-visible:outline-2 focus-visible:outline-(--color-accent)',
            mode === tab.id
              ? 'bg-(--color-accent) text-white shadow-md shadow-violet-500/30'
              : 'text-(--color-text-muted) hover:text-(--color-text)',
          ].join(' ')}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
