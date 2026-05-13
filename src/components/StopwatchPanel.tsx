import { useStopwatch } from '../hooks/useStopwatch';
import { formatStopwatch } from '../lib/formatTime';
import { ControlButton } from './ControlButton';
import { TimeDisplay } from './TimeDisplay';

export function StopwatchPanel() {
  const { elapsedMs, status, start, pause, reset } = useStopwatch();
  const { main, centis } = formatStopwatch(elapsedMs);

  const isRunning = status === 'running';
  const isIdle = status === 'idle';

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <TimeDisplay
        main={main}
        sub={centis}
        label="Elapsed"
        running={isRunning}
      />

      <div className="flex flex-wrap justify-center gap-3 w-full">
        {!isRunning ? (
          <ControlButton
            onClick={start}
            variant="primary"
            className="flex-1 min-w-[120px]"
          >
            {/* Play icon */}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.3 2.8A1.5 1.5 0 004 4.1v11.8a1.5 1.5 0 002.3 1.26l9.1-5.9a1.5 1.5 0 000-2.52L6.3 2.8z" />
            </svg>
            {isIdle ? 'Start' : 'Resume'}
          </ControlButton>
        ) : (
          <ControlButton
            onClick={pause}
            variant="secondary"
            className="flex-1 min-w-[120px]"
          >
            {/* Pause icon */}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm9 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Pause
          </ControlButton>
        )}

        <ControlButton
          onClick={reset}
          variant="danger"
          disabled={isIdle}
          className="flex-1 min-w-[120px]"
        >
          {/* Reset icon */}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.5a7 7 0 1110.78 1.72l.72.72a1 1 0 01-1.42 1.42l-1.5-1.5a1 1 0 010-1.42A5 5 0 106 7.5V10a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Reset
        </ControlButton>
      </div>

      {!isIdle && (
        <p className="text-xs text-(--color-text-muted) tracking-wide">
          {isRunning ? 'Running…' : 'Paused'}
        </p>
      )}
    </div>
  );
}
