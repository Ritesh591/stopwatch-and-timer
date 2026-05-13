/** Format milliseconds as MM:SS.cc (centiseconds) — used by stopwatch */
export function formatStopwatch(ms: number): { main: string; centis: string } {
  const totalCs = Math.floor(ms / 10);
  const centis = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const secs = totalSec % 60;
  const mins = Math.floor(totalSec / 60);
  return {
    main: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
    centis: String(centis).padStart(2, '0'),
  };
}

/** Format milliseconds as HH:MM:SS or MM:SS — used by timer */
export function formatTimer(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const secs = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const mins = totalMin % 60;
  const hours = Math.floor(totalMin / 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
