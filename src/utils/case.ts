export function splitWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map(word => word.toLowerCase())
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const CASES: Record<string, (text: string) => string> = {
  'camelCase': text => splitWords(text).map((word, i) => (i ? capitalize(word) : word)).join(''),
  'PascalCase': text => splitWords(text).map(capitalize).join(''),
  'snake_case': text => splitWords(text).join('_'),
  'kebab-case': text => splitWords(text).join('-'),
  'CONSTANT_CASE': text => splitWords(text).join('_').toUpperCase(),
  'Title Case': text => splitWords(text).map(capitalize).join(' '),
  'lower case': text => text.toLowerCase(),
  'UPPER CASE': text => text.toUpperCase(),
}

// Converts each line separately so a list of names can be converted in one go
export function convertCase(text: string, name: string): string {
  const convert = CASES[name] || CASES['camelCase']
  return text.split('\n').map(convert).join('\n')
}
