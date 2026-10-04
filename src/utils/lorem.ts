const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ' +
  'enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in ' +
  'reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa ' +
  'qui officia deserunt mollit anim id est laborum'
).split(' ')

const OPENING = 5

export type LoremUnit = 'paragraphs' | 'sentences' | 'words'

export function lorem(unit: LoremUnit, count: number, random = Math.random): string {
  const between = (min: number, max: number) => min + Math.floor(random() * (max - min + 1))
  // The text always opens with "lorem ipsum dolor sit amet"
  let used = 0
  const words = (n: number) => Array.from({ length: n }, () => (used < OPENING ? WORDS[used++] : WORDS[between(0, WORDS.length - 1)]))
  const sentence = () => {
    const text = words(between(6, 14)).join(' ')
    return text.charAt(0).toUpperCase() + text.slice(1) + '.'
  }
  const sentences = (n: number) => Array.from({ length: n }, sentence).join(' ')

  if (unit === 'words') {
    return words(count).join(' ')
  }
  if (unit === 'sentences') {
    return sentences(count)
  }
  return Array.from({ length: count }, () => sentences(between(3, 6))).join('\n\n')
}
