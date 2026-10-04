// r, g, b are 0-255 and a is 0-1
export interface Rgb {
  r: number
  g: number
  b: number
  a: number
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)
const round = (n: number, digits = 0) => Number(n.toFixed(digits))
const percent = (value: string, scale: number) => (value.endsWith('%') ? (parseFloat(value) / 100) * scale : parseFloat(value))

function parseHex(text: string): Rgb | null {
  const match = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(text)
  if (!match) {
    return null
  }
  let hex = match[1]
  if (hex.length < 6) {
    hex = hex.split('').map(c => c + c).join('')
  }
  const [r, g, b, a = 255] = hex.match(/../g).map(pair => parseInt(pair, 16))
  return { r, g, b, a: round(a / 255, 3) }
}

export function hslToRgb(h: number, s: number, l: number, a = 1): Rgb {
  h = ((h % 360) + 360) % 360
  const amount = s * Math.min(l, 1 - l)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    return 255 * (l - amount * Math.max(-1, Math.min(k - 3, 9 - k, 1)))
  }
  return { r: channel(0), g: channel(8), b: channel(4), a }
}

export function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const l = (max + min) / 2
  if (!delta) {
    return { h: 0, s: 0, l }
  }
  const s = delta / (1 - Math.abs(2 * l - 1))
  let h: number
  if (max === r) {
    h = ((g - b) / delta) % 6
  } else if (max === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }
  return { h: (h * 60 + 360) % 360, s, l }
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const fromLinear = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)

export function rgbToOklch({ r, g, b }: Rgb): { l: number; c: number; h: number } {
  const [lr, lg, lb] = [r, g, b].map(v => toLinear(v / 255))
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const labA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const labB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const chroma = Math.sqrt(labA * labA + labB * labB)
  const hue = chroma < 0.0005 ? 0 : ((Math.atan2(labB, labA) * 180) / Math.PI + 360) % 360
  return { l: lightness, c: chroma, h: hue }
}

// Colors outside the sRGB gamut are clipped
export function oklchToRgb(lightness: number, chroma: number, hue: number, a = 1): Rgb {
  const labA = chroma * Math.cos((hue * Math.PI) / 180)
  const labB = chroma * Math.sin((hue * Math.PI) / 180)
  const l = Math.pow(lightness + 0.3963377774 * labA + 0.2158037573 * labB, 3)
  const m = Math.pow(lightness - 0.1055613458 * labA - 0.0638541728 * labB, 3)
  const s = Math.pow(lightness - 0.0894841775 * labA - 1.291485548 * labB, 3)
  const [r, g, b] = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(v => clamp(fromLinear(v), 0, 1) * 255)
  return { r, g, b, a }
}

export function parseColor(input: string): Rgb | null {
  const text = input.trim().toLowerCase()
  const hex = parseHex(text)
  if (hex) {
    return hex
  }
  const match = /^(rgba?|hsla?|oklch)\(([^)]*)\)$/.exec(text)
  if (!match) {
    return null
  }
  const args = match[2].split(/[\s,/]+/).filter(Boolean)
  if (args.length < 3 || args.length > 4) {
    return null
  }
  const alpha = args[3] === undefined ? 1 : clamp(percent(args[3], 1), 0, 1)
  let color: Rgb
  if (match[1].startsWith('rgb')) {
    const [r, g, b] = args.slice(0, 3).map(v => clamp(percent(v, 255), 0, 255))
    color = { r, g, b, a: alpha }
  } else if (match[1].startsWith('hsl')) {
    color = hslToRgb(parseFloat(args[0]), clamp(parseFloat(args[1]) / 100, 0, 1), clamp(parseFloat(args[2]) / 100, 0, 1), alpha)
  } else {
    color = oklchToRgb(clamp(percent(args[0], 1), 0, 1), Math.max(percent(args[1], 0.4), 0), parseFloat(args[2]), alpha)
  }
  return [color.r, color.g, color.b, color.a].some(Number.isNaN) ? null : color
}

export function formatHex({ r, g, b, a }: Rgb): string {
  const channels = a < 1 ? [r, g, b, a * 255] : [r, g, b]
  return '#' + channels.map(v => Math.round(v).toString(16).padStart(2, '0')).join('')
}

export function formatRgb({ r, g, b, a }: Rgb): string {
  const channels = [r, g, b].map(v => Math.round(v)).join(', ')
  return a < 1 ? `rgba(${channels}, ${round(a, 3)})` : `rgb(${channels})`
}

export function formatHsl(color: Rgb): string {
  const { h, s, l } = rgbToHsl(color)
  const channels = `${round(h)}, ${round(s * 100)}%, ${round(l * 100)}%`
  return color.a < 1 ? `hsla(${channels}, ${round(color.a, 3)})` : `hsl(${channels})`
}

export function formatOklch(color: Rgb): string {
  const { l, c, h } = rgbToOklch(color)
  const channels = `${round(l * 100, 1)}% ${round(c, 3)} ${round(h, 2)}`
  return color.a < 1 ? `oklch(${channels} / ${round(color.a, 3)})` : `oklch(${channels})`
}
