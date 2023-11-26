export const totalPriceAndNightsCalculator = (price, checkIn, checkOut) => {
  let totalCost = 0;

  const roomPrice = parseFloat(price);
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  checkInDate.setUTCHours(14, 0, 0, 0);
  checkOutDate.setUTCHours(12, 0, 0, 0);

  const timeCorrection = 2 * 60 * 60 * 1000;
  const numberOfNights = Math.ceil(
    (checkOutDate - checkInDate - timeCorrection) / (1000 * 60 * 60 * 24)
  );

  const roomCost = numberOfNights * roomPrice;
  totalCost += roomCost;

  return [totalCost, numberOfNights];
};
