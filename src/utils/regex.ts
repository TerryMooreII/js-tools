export interface RegexMatch {
  index: number
  match: string
  groups: string[]
  named?: Record<string, string>
}

// Throws a SyntaxError when the pattern or flags are invalid
export function findMatches(pattern: string, flags: string, text: string, limit = 1000): RegexMatch[] {
  const regex = new RegExp(pattern, flags)
  const matches: RegexMatch[] = []
  let result: RegExpExecArray
  while (matches.length < limit && (result = regex.exec(text))) {
    const match: RegexMatch = { index: result.index, match: result[0], groups: result.slice(1) }
    if (result.groups) {
      match.named = { ...result.groups }
    }
    matches.push(match)
    if (!regex.global && !regex.sticky) {
      break
    }
    if (result[0] === '') {
      regex.lastIndex++
    }
  }
  return matches
}

export interface Segment {
  text: string
  match: boolean
}

// Splits text into matched and unmatched runs for highlighting
export function toSegments(text: string, matches: RegexMatch[]): Segment[] {
  const segments: Segment[] = []
  let position = 0
  for (const { index, match } of matches) {
    if (!match) {
      continue
    }
    if (index > position) {
      segments.push({ text: text.slice(position, index), match: false })
    }
    segments.push({ text: match, match: true })
    position = index + match.length
  }
  if (position < text.length) {
    segments.push({ text: text.slice(position), match: false })
  }
  return segments
}
