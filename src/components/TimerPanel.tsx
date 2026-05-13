import { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { formatTimer } from '../lib/formatTime';
import { ControlButton } from './ControlButton';
import { TimeDisplay } from './TimeDisplay';

interface DurationInputProps {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  disabled: boolean;
}

function DurationInput({ label, value, max, onChange, disabled }: DurationInputProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <label className="text-[10px] font-bold tracking-widest uppercase text-(--color-text-muted)">
        {label}
      </label>
      <input
        type="number"
        min={0}
        max={max}
        value={value === 0 ? '' : value}
        placeholder="00"
        disabled={disabled}
        onChange={e => {
          const v = Math.max(0, Math.min(max, parseInt(e.target.value || '0', 10)));
          onChange(isNaN(v) ? 0 : v);
        }}
        className={[
          'w-20 text-center text-2xl font-mono tabular-nums rounded-xl py-3',
          'bg-(--color-surface-2) border border-(--color-border)',
          'text-(--color-text) placeholder:text-(--color-text-muted)/40',
          'focus:outline-none focus:ring-2 focus:ring-(--color-accent)/60',
          'transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',
          '[&::-webkit-outer-spin-button]:appearance-none',
        ].join(' ')}
      />
    </div>
  );
}

function Colon() {
  return (
    <span className="text-2xl font-mono text-(--color-text-muted) pb-1 select-none">:</span>
  );
}

export function TimerPanel() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { remainingMs, status, start, pause, resume, reset } = useTimer();

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';
  const isActive = isRunning || isPaused || isFinished;

  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
  const canStart = totalMs > 0 && !isActive;

  function handleStart() {
    start(totalMs);
  }

  function handleReset() {
    reset();
  }

  const displayMs = isActive ? remainingMs : totalMs;
  const displayStr = formatTimer(displayMs);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      {/* Duration input row */}
      <div
        className={[
          'flex items-end gap-2 p-5 rounded-2xl border',
          'bg-(--color-surface-2) border-(--color-border)',
          'transition-opacity duration-300',
          isActive ? 'opacity-50 pointer-events-none' : '',
        ].join(' ')}
      >
        <DurationInput label="Hours" value={hours} max={99} onChange={setHours} disabled={isActive} />
        <Colon />
        <DurationInput label="Min" value={minutes} max={59} onChange={setMinutes} disabled={isActive} />
        <Colon />
        <DurationInput label="Sec" value={seconds} max={59} onChange={setSeconds} disabled={isActive} />
      </div>

      {/* Main time display */}
      <TimeDisplay
        main={displayStr}
        label={isFinished ? 'Done' : isActive ? 'Remaining' : 'Duration'}
        finished={isFinished}
        running={isRunning}
      />

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {!isActive ? (
          <ControlButton
            onClick={handleStart}
            variant="primary"
            disabled={!canStart}
            className="flex-1 min-w-[120px]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.3 2.8A1.5 1.5 0 004 4.1v11.8a1.5 1.5 0 002.3 1.26l9.1-5.9a1.5 1.5 0 000-2.52L6.3 2.8z" />
            </svg>
            Start
          </ControlButton>
        ) : isRunning ? (
          <ControlButton
            onClick={pause}
            variant="secondary"
            className="flex-1 min-w-[120px]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm9 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Pause
          </ControlButton>
        ) : isPaused ? (
          <ControlButton
            onClick={resume}
            variant="primary"
            className="flex-1 min-w-[120px]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.3 2.8A1.5 1.5 0 004 4.1v11.8a1.5 1.5 0 002.3 1.26l9.1-5.9a1.5 1.5 0 000-2.52L6.3 2.8z" />
            </svg>
            Resume
          </ControlButton>
        ) : null}

        <ControlButton
          onClick={handleReset}
          variant="danger"
          disabled={!isActive && totalMs === 0}
          className="flex-1 min-w-[120px]"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.5a7 7 0 1110.78 1.72l.72.72a1 1 0 01-1.42 1.42l-1.5-1.5a1 1 0 010-1.42A5 5 0 106 7.5V10a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Reset
        </ControlButton>
      </div>

      {isFinished && (
        <p className="text-xs text-emerald-400 tracking-wide">
          Timer finished — reset or set a new duration to start again.
        </p>
      )}
    </div>
  );
}
