import { isEmail, isNonEmpty } from '../validation';

describe('validation utilities', () => {
  describe('isEmail', () => {
    it('validates correct email formats', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@domain.co.uk')).toBe(true);
      expect(isEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isEmail('notanemail')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('user@')).toBe(false);
      expect(isEmail('user@.com')).toBe(false);
      expect(isEmail('user @example.com')).toBe(false);
    });
  });

  describe('isNonEmpty', () => {
    it('returns true for non-empty strings', () => {
      expect(isNonEmpty('hello')).toBe(true);
      expect(isNonEmpty('  text  ')).toBe(true);
    });

    it('returns false for empty strings', () => {
      expect(isNonEmpty('')).toBe(false);
      expect(isNonEmpty('   ')).toBe(false);
      expect(isNonEmpty('\t\n')).toBe(false);
    });
  });
});
