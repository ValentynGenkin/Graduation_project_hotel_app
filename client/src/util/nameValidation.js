export function isValidName(name) {
  const namePattern = /^[A-Za-z\s-]{2,}$/;
  return namePattern.test(name);
}
