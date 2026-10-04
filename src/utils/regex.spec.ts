import { findMatches, toSegments } from './regex';

describe('regex', () => {
  it('finds every match with its groups when global', () => {
    expect(findMatches('(\\w)(\\d)', 'g', 'a1 b2')).toEqual([
      { index: 0, match: 'a1', groups: ['a', '1'] },
      { index: 3, match: 'b2', groups: ['b', '2'] },
    ]);
  });

  it('finds only the first match without the global flag', () => {
    expect(findMatches('\\d', '', '1 2 3')).toHaveLength(1);
  });

  it('includes named groups', () => {
    expect(findMatches('(?<year>\\d{4})', 'g', 'in 2024')[0].named).toEqual({ year: '2024' });
  });

  it('does not loop forever on zero-length matches', () => {
    expect(findMatches('x*', 'g', 'abc')).toHaveLength(4);
  });

  it('stops at the match limit', () => {
    expect(findMatches('a', 'g', 'aaaaa', 3)).toHaveLength(3);
  });

  it('throws on an invalid pattern', () => {
    expect(() => findMatches('(', 'g', 'text')).toThrow();
  });

  it('splits text into matched and unmatched segments', () => {
    const text = 'one 22 three 4';
    expect(toSegments(text, findMatches('\\d+', 'g', text))).toEqual([
      { text: 'one ', match: false },
      { text: '22', match: true },
      { text: ' three ', match: false },
      { text: '4', match: true },
    ]);
  });
});
