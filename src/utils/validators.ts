const validators = {
  validateChars: (str: string): boolean => {
    const reLetter = new RegExp(/[a-zA-Z]/);
    const reNumber = new RegExp(/[0-9]/);
    const reSymbol = new RegExp(/[\!\@\#\$\%]/);

    if (reLetter.test(str) && reNumber.test(str) && reSymbol.test(str)) return true;
    return false;
  },

  validateLength: (str: string, min: number, max: number): boolean => {
    const length = str.length;
    if (length >= min && length <= max) return true;
    return false;
  },

  validateUsername: (username: string): boolean => {
    if (validators.validateLength(username, 10, 50) && validators.validateChars(username)) return true;
    return false;
  },

  validatePassword: (password: string): boolean => {
    if (validators.validateLength(password, 20, 50) && validators.validateChars(password)) return true;
    return false;
  }
}

export default validators;