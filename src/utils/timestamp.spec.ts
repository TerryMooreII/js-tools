import { describeTimestamp, parseTimestamp, relativeTime } from './timestamp';

const ISO = '2023-11-14T22:13:20.000Z';

describe('timestamp', () => {
  it('reads epoch seconds, epoch milliseconds and date strings', () => {
    expect(parseTimestamp('1700000000').toISOString()).toBe(ISO);
    expect(parseTimestamp(' 1700000000000 ').toISOString()).toBe(ISO);
    expect(parseTimestamp('2023-11-14T22:13:20Z').toISOString()).toBe(ISO);
    expect(parseTimestamp('0').toISOString()).toBe('1970-01-01T00:00:00.000Z');
    expect(parseTimestamp('-86400').toISOString()).toBe('1969-12-31T00:00:00.000Z');
  });

  it('returns null for anything that is not a date', () => {
    expect(parseTimestamp('')).toBeNull();
    expect(parseTimestamp('not a date')).toBeNull();
    expect(parseTimestamp('99999999999999999999')).toBeNull();
  });

  it('describes how far away a date is', () => {
    const now = new Date(ISO);
    const offset = (seconds: number) => new Date(now.getTime() + seconds * 1000);
    expect(relativeTime(offset(-30), now)).toBe('30 seconds ago');
    expect(relativeTime(offset(-3 * 3600), now)).toBe('3 hours ago');
    expect(relativeTime(offset(2 * 86400), now)).toBe('in 2 days');
    expect(relativeTime(offset(-400 * 86400), now)).toBe('last year');
    expect(relativeTime(now, now)).toBe('now');
  });

  it('lists every representation', () => {
    const lines = describeTimestamp(new Date(ISO), new Date(ISO)).split('\n');
    expect(lines[0]).toBe('Unix (seconds):  1700000000');
    expect(lines[1]).toBe('Unix (ms):       1700000000000');
    expect(lines[2]).toBe(`ISO 8601 (UTC):  ${ISO}`);
    expect(lines).toHaveLength(5);
  });
});
