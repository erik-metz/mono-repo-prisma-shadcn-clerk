// packages/utils/logger.ts
type LogLevel = 'log' | 'info' | 'warn' | 'error'

function output(level: LogLevel, ...args: unknown[]) {
  // ✅ Works both on server and browser
  if (typeof window === 'undefined') {
    // Server environment (Node / Vercel / Edge)
    console[level]('[server]', ...args)
  } else {
    // Browser environment
    console[level]('[browser]', ...args)
  }
}

export const logger = {
  log: (...args: unknown[]) => output('log', ...args),
  info: (...args: unknown[]) => output('info', ...args),
  warn: (...args: unknown[]) => output('warn', ...args),
  error: (...args: unknown[]) => output('error', ...args),
}
