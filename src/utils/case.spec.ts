import { convertCase, splitWords } from './case';

describe('case', () => {
  it('splits words on separators and case boundaries', () => {
    expect(splitWords('helloWorld foo_bar-baz')).toEqual(['hello', 'world', 'foo', 'bar', 'baz']);
    expect(splitWords('parseHTTPResponse')).toEqual(['parse', 'http', 'response']);
    expect(splitWords('version2Update')).toEqual(['version2', 'update']);
  });

  it('converts to each case', () => {
    const text = 'hello world-fooBar';
    expect(convertCase(text, 'camelCase')).toBe('helloWorldFooBar');
    expect(convertCase(text, 'PascalCase')).toBe('HelloWorldFooBar');
    expect(convertCase(text, 'snake_case')).toBe('hello_world_foo_bar');
    expect(convertCase(text, 'kebab-case')).toBe('hello-world-foo-bar');
    expect(convertCase(text, 'CONSTANT_CASE')).toBe('HELLO_WORLD_FOO_BAR');
    expect(convertCase(text, 'Title Case')).toBe('Hello World Foo Bar');
    expect(convertCase(text, 'UPPER CASE')).toBe('HELLO WORLD-FOOBAR');
  });

  it('converts each line separately', () => {
    expect(convertCase('first name\nlast name', 'snake_case')).toBe('first_name\nlast_name');
  });
});
