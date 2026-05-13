import { useState, useRef, useCallback, useEffect } from 'react';

type StopwatchStatus = 'idle' | 'running' | 'paused';

export interface StopwatchState {
  elapsedMs: number;
  status: StopwatchStatus;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useStopwatch(): StopwatchState {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [status, setStatus] = useState<StopwatchStatus>('idle');

  const rafRef = useRef<number | null>(null);
  const runStartedAtRef = useRef<number>(0);
  const baseElapsedRef = useRef<number>(0);

  const tick = useCallback(() => {
    setElapsedMs(baseElapsedRef.current + (Date.now() - runStartedAtRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    runStartedAtRef.current = Date.now();
    setStatus('running');
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    baseElapsedRef.current += Date.now() - runStartedAtRef.current;
    setElapsedMs(baseElapsedRef.current);
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    baseElapsedRef.current = 0;
    runStartedAtRef.current = 0;
    setElapsedMs(0);
    setStatus('idle');
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { elapsedMs, status, start, pause, reset };
}
