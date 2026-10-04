import { parseUrl } from './url';

describe('url', () => {
  it('breaks a URL into its parts', () => {
    expect(parseUrl('https://user:pw@example.com:8080/a/b?x=1&y=two#top')).toEqual({
      href: 'https://user:pw@example.com:8080/a/b?x=1&y=two#top',
      origin: 'https://example.com:8080',
      protocol: 'https:',
      username: 'user',
      password: 'pw',
      host: 'example.com:8080',
      hostname: 'example.com',
      port: '8080',
      pathname: '/a/b',
      search: '?x=1&y=two',
      hash: '#top',
      params: { x: '1', y: 'two' },
    });
  });

  it('collects repeated query parameters into arrays', () => {
    expect(parseUrl('https://example.com/?tag=a&tag=b&tag=c&q=hello%20world').params).toEqual({
      tag: ['a', 'b', 'c'],
      q: 'hello world',
    });
  });

  it('throws on an invalid URL', () => {
    expect(() => parseUrl('example.com/path')).toThrow();
  });
});
