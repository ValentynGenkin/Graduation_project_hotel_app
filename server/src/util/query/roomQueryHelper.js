export const filterRooms = (req) => {
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

  if (req.query.checkIn && req.query.checkOut) {
    const checkIn = new Date(req.query.checkIn);
    const checkOut = new Date(req.query.checkOut);

    // Join 'rooms' with 'bookingdetails'
    stages.push({
      $lookup: {
        from: "bookingdetails",
        localField: "_id",
        foreignField: "roomId",
        as: "bookings",
      },
    });

    // Filter rooms
    stages.push({
      $match: {
        $or: [
          { "bookings.checkIn": { $gt: checkOut } },
          { "bookings.checkOut": { $lt: checkIn } },
          { bookings: { $size: 0 } },
        ],
      },
    });

    // Remove  'bookings' field
    stages.push({ $project: { bookings: 0 } });
  } //TODO: after create bookingDetails model add here else condition which returns an error

  return stages;
};

export const findAvailableRoomAggregation = (
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
        from: "BookingDetail",
        localField: "_id",
        foreignField: "roomId",
        as: "bookings",
      },
    },
    {
      $match: {
        $or: [
          { bookings: { $size: 0 } }, // No bookings for the room
          {
            $and: [
              { "bookings.checkIn": { $gt: checkOut } },
              { "bookings.checkOut": { $lt: checkIn } },
            ],
          },
        ],
      },
    },
    {
      $limit: 1,
    },
  ];

  return stages;
};
