export const dateFormatter = (date) => {
  return `${date.getUTCFullYear().toString()}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
};
