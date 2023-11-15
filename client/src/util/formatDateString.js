export function formatDateString(dateString) {
  return dateString.replace(
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    function (match, year, month, day) {
      return (
        year +
        "-" +
        parseInt(month, 10).toString().padStart(2, "0") +
        "-" +
        parseInt(day, 10).toString().padStart(2, "0")
      );
    }
  );
}
