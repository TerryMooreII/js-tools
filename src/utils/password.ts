export const CHARSETS: Record<string, string> = {
  Lowercase: 'abcdefghijklmnopqrstuvwxyz',
  Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Digits: '0123456789',
  Symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
}

const randomBytes = (count: number) => crypto.getRandomValues(new Uint8Array(count))

// Bytes that would bias the result towards the start of `chars` are discarded
export function randomString(length: number, chars: string, getBytes = randomBytes): string {
  if (!chars || chars.length > 256) {
    return ''
  }
  const limit = Math.floor(256 / chars.length) * chars.length
  let result = ''
  while (result.length < length) {
    for (const byte of getBytes(length - result.length)) {
      if (byte < limit) {
        result += chars[byte % chars.length]
      }
    }
  }
  return result
}
