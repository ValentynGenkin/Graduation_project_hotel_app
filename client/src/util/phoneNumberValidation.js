export function isValidPhoneNumber(phone) {
  const phonePattern = /^\+\d+$/;

  const minLength = 6;
  const maxLength = 15;

  if (phonePattern.test(phone)) {
    return phone.length >= minLength && phone.length <= maxLength;
  }

  return false;
}
