import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNo: {
    type: Number,
    required: true,
    unique: [true, "There is already a room with this room number."],
  },
  roomDescription: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  bedCount: {
    type: Number,
    required: true,
  },
  roomPrice: {
    type: mongoose.Schema.Types.Decimal128,
  },
  facilities: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
