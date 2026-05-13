import { useState, useRef, useCallback, useEffect } from 'react';

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface TimerState {
  remainingMs: number;
  status: TimerStatus;
  totalMs: number;
  start: (durationMs: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer(): TimerState {
  const [remainingMs, setRemainingMs] = useState(0);
  const [totalMs, setTotalMs] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');

  const rafRef = useRef<number | null>(null);
  const runStartedAtRef = useRef<number>(0);
  const baseRemainingRef = useRef<number>(0);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const remaining = baseRemainingRef.current - (Date.now() - runStartedAtRef.current);
    if (remaining <= 0) {
      setRemainingMs(0);
      setStatus('finished');
      stop();
      return;
    }
    setRemainingMs(remaining);
    rafRef.current = requestAnimationFrame(tick);
  }, [stop]);

  const start = useCallback(
    (durationMs: number) => {
      stop();
      baseRemainingRef.current = durationMs;
      runStartedAtRef.current = Date.now();
      setTotalMs(durationMs);
      setRemainingMs(durationMs);
      setStatus('running');
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick, stop],
  );

  const pause = useCallback(() => {
    stop();
    baseRemainingRef.current = baseRemainingRef.current - (Date.now() - runStartedAtRef.current);
    setRemainingMs(Math.max(0, baseRemainingRef.current));
    setStatus('paused');
  }, [stop]);

  const resume = useCallback(() => {
    runStartedAtRef.current = Date.now();
    setStatus('running');
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const reset = useCallback(() => {
    stop();
    baseRemainingRef.current = totalMs;
    setRemainingMs(totalMs);
    setStatus(totalMs > 0 ? 'idle' : 'idle');
  }, [stop, totalMs]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { remainingMs, totalMs, status, start, pause, resume, reset };
}
