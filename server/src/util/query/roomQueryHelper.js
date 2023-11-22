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
      $match: {
        bedCount: {
          $in: filterInputs.bedCount.split(",").map((count) => parseInt(count)),
        },
      },
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
  // we group same rooms here.
  stages.push({
    $group: {
      _id: {
        roomType: "$roomType",
        bedCount: "$bedCount",
        facilities: "$facilities",
        roomPrice: "$roomPrice",
      },
      count: { $sum: 1 },
      exampleRoom: { $first: "$$ROOT" },
    },
  });

  return stages;
};

export const chooseAvailableRoomAggregation = (
  exampleRoom,
  checkIn,
  checkOut,
  limit
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
      $limit: limit,
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
  const total = !model
    ? query.length
    : await model.countDocuments(query.getQuery());

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
export function* generateCombinations(rooms, roomCount, personCount) {
  const seenCombinations = new Set();

  const getCombinationKey = (combination) => {
    const sortedIds = combination.map((room) => room.exampleRoom._id).sort();
    return sortedIds.join(",");
  };

  function* combine(tempArray, start, bedCount) {
    if (tempArray.length === roomCount) {
      if (bedCount >= personCount) {
        const key = getCombinationKey(tempArray);
        if (!seenCombinations.has(key)) {
          seenCombinations.add(key);
          yield [...tempArray];
        }
      }
      return;
    }

    for (let i = start; i < rooms.length; i++) {
      tempArray.push(rooms[i]);
      yield* combine(
        tempArray,
        i + 1,
        bedCount + rooms[i].exampleRoom.bedCount
      );
      tempArray.pop();
    }
  }

  yield* combine([], 0, 0);
}
