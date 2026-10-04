import { lorem } from './lorem';

describe('lorem', () => {
  it('generates the requested number of words', () => {
    expect(lorem('words', 5)).toBe('lorem ipsum dolor sit amet');
    expect(lorem('words', 40).split(' ')).toHaveLength(40);
  });

  it('generates capitalised sentences', () => {
    const sentences = lorem('sentences', 4).split('. ');
    expect(sentences).toHaveLength(4);
    expect(sentences[0]).toMatch(/^Lorem ipsum dolor sit amet/);
    sentences.forEach(sentence => expect(sentence).toMatch(/^[A-Z]/));
  });

  it('generates paragraphs separated by blank lines', () => {
    const paragraphs = lorem('paragraphs', 3).split('\n\n');
    expect(paragraphs).toHaveLength(3);
    paragraphs.forEach(paragraph => expect(paragraph).toMatch(/\.$/));
  });
});
