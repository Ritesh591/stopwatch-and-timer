import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { ModeTabs, type Mode } from './components/ModeTabs';
import { StopwatchPanel } from './components/StopwatchPanel';
import { TimerPanel } from './components/TimerPanel';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const { theme, toggle } = useTheme();
  const [mode, setMode] = useState<Mode>('stopwatch');

  return (
    <div className="min-h-svh bg-(--color-bg) transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
          bg-violet-400/10 blur-[100px]"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full
          bg-purple-500/10 blur-[120px]"
      />

      <div className="relative z-10 flex flex-col min-h-svh px-4 pb-16">
        {/* Header */}
        <header className="flex items-center justify-between py-6 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⏱</span>
            <h1 className="text-lg font-bold tracking-tight text-(--color-text)">
              Chrono<span className="text-(--color-accent)">Lab</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-(--color-text-muted) font-medium hidden sm:block">
              {theme === 'dark' ? 'Dark' : 'Light'} mode
            </span>
            <ThemeToggle theme={theme} onToggle={toggle} />
          </div>
        </header>

        {/* Main card */}
        <main className="flex-1 flex flex-col items-center justify-center gap-10 max-w-2xl mx-auto w-full">
          {/* Hero text */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--color-text)">
              {mode === 'stopwatch' ? (
                <>
                  Stop<span className="text-(--color-accent)">watch</span>
                </>
              ) : (
                <>
                  Count<span className="text-(--color-accent)">down</span>
                </>
              )}
            </h2>
            <p className="text-(--color-text-muted) text-sm">
              {mode === 'stopwatch'
                ? 'Measure elapsed time with centisecond precision.'
                : 'Set a custom duration and count down.'}
            </p>
          </div>

          {/* Mode tabs */}
          <ModeTabs mode={mode} onChange={setMode} />

          {/* Panel */}
          <div className="w-full">
            {mode === 'stopwatch' ? <StopwatchPanel /> : <TimerPanel />}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-xs text-(--color-text-muted)/60">
            ChronoLab — precision time tools
          </p>
        </footer>
      </div>
    </div>
  );
}
