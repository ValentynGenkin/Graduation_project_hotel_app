export function isValidName(name) {
  const namePattern = /^[A-Za-z-]{2,}$/;
  return namePattern.test(name);
}
