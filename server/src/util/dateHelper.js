export const getDayDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const date1InMs = date1.getTime();
  const date2InMs = date2.getTime();

  const differenceInMs = Math.abs(date2InMs - date1InMs);

  return Math.floor(differenceInMs / oneDay);
};

export const getDaysInMonth = (year, month) => {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDate();
};

export const getMonth = (req) => {
  let month = parseInt(req.params.month);
  let year = parseInt(req.params.year);

  month = month < 10 ? `0${month}` : month;

  let nextMonth = month + 1;
  let yearOfNextMonth = year;

  if (nextMonth > 12) {
    nextMonth = 1;
    yearOfNextMonth++;
  }

  return { month, year, nextMonth, yearOfNextMonth };
};
export const calculateTotalBookedDays = (bookings) => {
  let totalBookedDays = 0;

  bookings.forEach((booking) => {
    const totalDaysOfDetail = booking.bookingDetails.reduce((acc, detail) => {
      return (
        acc +
        getDayDifference(new Date(detail.checkIn), new Date(detail.checkOut))
      );
    }, 0);

    totalBookedDays += totalDaysOfDetail;
  });
  return totalBookedDays;
};
export const getMonthBoundaries = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayCurrentMonth = new Date(year, month, 1, 0, 0, 0);
  const firstDayNextMonth = new Date(year, month + 1, 1, 0, 0, 0);

  return { firstDayCurrentMonth, firstDayNextMonth };
};
