// Bare numbers are epoch seconds unless they are large enough to be milliseconds
export function parseTimestamp(input: string): Date | null {
  const text = input.trim()
  if (!text) {
    return null
  }
  let date: Date
  if (/^-?\d+(\.\d+)?$/.test(text)) {
    const number = Number(text)
    date = new Date(Math.abs(number) >= 1e11 ? number : number * 1000)
  } else {
    date = new Date(text)
  }
  return Number.isNaN(date.getTime()) ? null : date
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

export function relativeTime(date: Date, now = new Date()): string {
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000)
  const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const [unit, size] = UNITS.find(([, size]) => Math.abs(seconds) >= size) || UNITS[UNITS.length - 1]
  return format.format(Math.trunc(seconds / size), unit)
}

export function describeTimestamp(date: Date, now = new Date()): string {
  return [
    `Unix (seconds):  ${Math.floor(date.getTime() / 1000)}`,
    `Unix (ms):       ${date.getTime()}`,
    `ISO 8601 (UTC):  ${date.toISOString()}`,
    `Local:           ${date.toString()}`,
    `Relative:        ${relativeTime(date, now)}`,
  ].join('\n')
}
