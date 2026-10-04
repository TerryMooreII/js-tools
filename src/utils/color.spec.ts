import { formatHex, formatHsl, formatOklch, formatRgb, parseColor } from './color';

const rounded = (text: string) => {
  const { r, g, b, a } = parseColor(text);
  return [Math.round(r), Math.round(g), Math.round(b), a];
};

describe('color', () => {
  it('parses hex colors', () => {
    expect(rounded('#f00')).toEqual([255, 0, 0, 1]);
    expect(rounded('#3B82F6')).toEqual([59, 130, 246, 1]);
    expect(rounded('#00000080')).toEqual([0, 0, 0, 0.502]);
  });

  it('parses rgb, hsl and oklch functions', () => {
    expect(rounded('rgb(59, 130, 246)')).toEqual([59, 130, 246, 1]);
    expect(rounded('rgb(100% 0% 0% / 50%)')).toEqual([255, 0, 0, 0.5]);
    expect(rounded('hsl(120 100% 25%)')).toEqual([0, 128, 0, 1]);
    expect(rounded('hsla(0, 100%, 50%, 0.25)')).toEqual([255, 0, 0, 0.25]);
    expect(rounded('oklch(62.8% 0.2577 29.23)')).toEqual([255, 0, 0, 1]);
    expect(rounded('oklch(1 0 0)')).toEqual([255, 255, 255, 1]);
  });

  it('rejects anything else', () => {
    expect(parseColor('')).toBeNull();
    expect(parseColor('#12')).toBeNull();
    expect(parseColor('rgb(1, 2)')).toBeNull();
    expect(parseColor('rgb(a, b, c)')).toBeNull();
    expect(parseColor('rebeccapurple')).toBeNull();
  });

  it('formats every representation', () => {
    const red = parseColor('#ff0000');
    expect(formatHex(red)).toBe('#ff0000');
    expect(formatRgb(red)).toBe('rgb(255, 0, 0)');
    expect(formatHsl(red)).toBe('hsl(0, 100%, 50%)');
    expect(formatOklch(red)).toBe('oklch(62.8% 0.258 29.23)');

    const blue = parseColor('#3b82f6');
    expect(formatHsl(blue)).toBe('hsl(217, 91%, 60%)');
    expect(formatOklch(parseColor('#ffffff'))).toBe('oklch(100% 0 0)');
  });

  it('keeps alpha when formatting', () => {
    const color = parseColor('rgba(255, 0, 0, 0.5)');
    expect(formatHex(color)).toBe('#ff000080');
    expect(formatRgb(color)).toBe('rgba(255, 0, 0, 0.5)');
    expect(formatHsl(color)).toBe('hsla(0, 100%, 50%, 0.5)');
    expect(formatOklch(color)).toBe('oklch(62.8% 0.258 29.23 / 0.5)');
  });
});
