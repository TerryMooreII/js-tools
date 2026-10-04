import { CHARSETS, randomString } from './password';

const bytes = (...values: number[]) => () => new Uint8Array(values);

describe('password', () => {
  it('maps random bytes onto the character set', () => {
    expect(randomString(3, 'abc', bytes(0, 1, 2))).toBe('abc');
  });

  it('discards bytes that would bias the result', () => {
    // 256 is not a multiple of 3, so 255 is rejected and the next byte is used instead
    expect(randomString(2, 'abc', bytes(255, 0, 1))).toBe('ab');
  });

  it('returns nothing without a character set', () => {
    expect(randomString(8, '')).toBe('');
  });

  it('only uses characters from the set', () => {
    let seed = 1;
    const pseudoRandom = (count: number) => Uint8Array.from({ length: count }, () => (seed = (seed * 73 + 41) % 256));
    const result = randomString(500, CHARSETS.Digits, pseudoRandom);
    expect(result).toHaveLength(500);
    expect(result).toMatch(/^[0-9]+$/);
  });
});
