import validators from 'src/utils/validators';

describe('validateChars', () => {
  test('returns true', () => {
    expect(validators.validateChars('Iamalongenoughtstring5$')).toBe(true);
  });

  test('returns false for missing letter', () => {
    expect(validators.validateChars('92374921748927$')).toBe(false);
  });

  test('returns false for missing number', () => {
    expect(validators.validateChars('Idonothaveanynumbers$')).toBe(false);
  });

  test('returns false for missing symbol', () => {
    expect(validators.validateChars('Idonothaveanysymbols')).toBe(false);
  });
});