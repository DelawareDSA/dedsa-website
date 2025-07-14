import { sanitizeString } from '../sanitization';

describe('sanitizeString', () => {
  it('removes HTML tags', () => {
    expect(sanitizeString('<p>Hello</p>')).toBe('Hello');
    expect(sanitizeString('<script>alert("xss")</script>')).toBe(
      'alert("xss")'
    );
    expect(sanitizeString('Text with <b>bold</b> and <i>italic</i>')).toBe(
      'Text with bold and italic'
    );
  });

  it('trims whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
    expect(sanitizeString('\n\ttext\n\t')).toBe('text');
  });

  it('handles self-closing tags', () => {
    expect(sanitizeString('Line 1<br/>Line 2')).toBe('Line 1Line 2');
    expect(sanitizeString('<img src="test.jpg" />')).toBe('');
  });

  it('handles empty strings', () => {
    expect(sanitizeString('')).toBe('');
    expect(sanitizeString('   ')).toBe('');
  });
});
