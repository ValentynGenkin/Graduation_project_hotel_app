export const filterRoomsAggregation = (req) => {
  const filterInputs = req.query;
  const stages = [];

  // filter rooms by the specified types.
  if (filterInputs.roomType) {
    stages.push({
      $match: { roomType: { $in: filterInputs.roomType.split(",") } },
    });
  }

  // filter rooms match all specified facilities.
  if (filterInputs.facilities) {
    stages.push({
      $match: { facilities: { $all: filterInputs.facilities.split(",") } },
    });
  }

  // filter rooms with a bed count equal to or greater
  if (filterInputs.bedCount) {
    stages.push({
      $match: { bedCount: { $gte: Number(filterInputs.bedCount) } },
    });
  }

  //filter rooms with a roomPrice equal to or less
  if (filterInputs.roomPrice) {
    stages.push({
      $match: { roomPrice: { $lte: Number(filterInputs.roomPrice) } },
    });
  }

  // Check room availability

  if (filterInputs.checkIn && filterInputs.checkOut) {
    const checkIn = new Date(filterInputs.checkIn);
    const checkOut = new Date(filterInputs.checkOut);

    // Join 'rooms' with 'bookingdetails'
    stages.push({
      $lookup: {
        from: "bookingdetails",
        localField: "_id",
        foreignField: "roomId",
        as: "bookings",
      },
    });

    // Detect overlapping bookings
    stages.push({
      $addFields: {
        overlappingBookings: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $or: [
                {
                  $and: [
                    { $lt: ["$$booking.checkIn", checkOut] },
                    { $gt: ["$$booking.checkOut", checkIn] },
                  ],
                },
                {
                  $and: [
                    { $gt: ["$$booking.checkIn", checkIn] },
                    { $lt: ["$$booking.checkOut", checkOut] },
                  ],
                },
              ],
            },
          },
        },
      },
    });

    // Filter rooms without overlapping bookings
    stages.push({
      $match: {
        overlappingBookings: { $size: 0 },
      },
    });

    // Remove 'bookings' and 'overlappingBookings' fields
    stages.push({ $project: { bookings: 0, overlappingBookings: 0 } });
  } //TODO: after create bookingDetails model add here else condition which returns an error

  return stages;
};

export const chooseAvailableRoomAggregation = (
  exampleRoom,
  checkIn,
  checkOut
) => {
  const stages = [
    {
      $match: {
        roomType: exampleRoom.roomType,
        bedCount: exampleRoom.bedCount,
        facilities: exampleRoom.facilities,
        roomPrice: exampleRoom.roomPrice,
      },
    },
    {
      $lookup: {
        from: "bookingdetails",
        localField: "_id",
        foreignField: "roomId",
        as: "bookings",
      },
    },
    {
      $addFields: {
        overlappingBookings: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $or: [
                {
                  $and: [
                    { $lt: ["$$booking.checkIn", checkOut] },
                    { $gt: ["$$booking.checkOut", checkIn] },
                  ],
                },
                {
                  $and: [
                    { $gt: ["$$booking.checkIn", checkIn] },
                    { $lt: ["$$booking.checkOut", checkOut] },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $match: {
        overlappingBookings: { $size: 0 },
      },
    },
    {
      $limit: 1,
    },
  ];

  return stages;
};

export const paginationHelper = async (model, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = {};
  const total = await model.countDocuments(query.getQuery());

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  pagination.total = total;
  return {
    query: query.skip(startIndex).limit(limit),
    pagination: pagination,
  };
};
