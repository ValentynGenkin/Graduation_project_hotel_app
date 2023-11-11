export const getDayDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const date1InMs = date1.getTime();
  const date2InMs = date2.getTime();

  const differenceInMs = Math.abs(date2InMs - date1InMs);

  return Math.floor(differenceInMs / oneDay);
};
