export const calculateDailyCost = (bookings) => {
  return bookings.reduce((acc, booking) => {
    const date = booking.createdAt.getDate(); // Extract day from the date
    const cost = booking.cost ? parseFloat(booking.cost.toString()) : 0;

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += cost;

    return acc;
  }, {});
};
