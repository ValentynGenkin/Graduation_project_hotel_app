import Room from "../models/Room.js";

// let roomType = [
//   {
//     roomDescription: "A cozy room with all the basic facilities.",
//     roomType: "Single",
//     bedCount: 1,
//     roomPrice: 50,
//     facilities: ["Wi-Fi", "TV"],
//     images: ["/public/images/image-1.jpeg", "/public/images/image-2.jpeg"],
//   },
//   {
//     roomDescription: "A spacious room for families.",
//     roomType: "Family",
//     bedCount: 4,
//     roomPrice: 200,
//     facilities: ["Wi-Fi", "TV", "Kitchen"],
//     images: ["/public/images/image-3.jpeg", "/public/images/image-4.jpeg"],
//   },
//   {
//     roomDescription: "Luxury room with a beautiful sea view.",
//     roomType: "Luxury",
//     bedCount: 2,
//     roomPrice: 300,
//     facilities: ["Wi-Fi", "TV", "Minibar", "Sea View"],
//     images: ["/public/images/image-5.jpeg", "/public/images/image-1.jpeg"],
//   },
//   {
//     roomDescription: "Comfortable room for business trips.",
//     roomType: "Business",
//     bedCount: 1,
//     roomPrice: 150,
//     facilities: ["Wi-Fi", "TV", "Work Desk"],
//     images: ["/public/images/image-2.jpeg", "/public/images/image-3.jpeg"],
//   },
//   {
//     roomDescription: "Budget room with essential amenities.",
//     roomType: "Budget",
//     bedCount: 1,
//     roomPrice: 75,
//     facilities: ["Wi-Fi"],
//     images: ["/public/images/image-4.jpeg", "/public/images/image-5.jpeg"],
//   },
//   {
//     roomDescription: "Premium suite with luxurious facilities.",
//     roomType: "Suite",
//     bedCount: 3,
//     roomPrice: 400,
//     facilities: ["Wi-Fi", "TV", "Jacuzzi"],
//     images: ["/public/images/image-1.jpeg", "/public/images/image-2.jpeg"],
//   },
//   {
//     roomDescription: "Twin room with two single beds.",
//     roomType: "Twin",
//     bedCount: 2,
//     roomPrice: 100,
//     facilities: ["Wi-Fi", "TV"],
//     images: ["/public/images/image-3.jpeg", "/public/images/image-4.jpeg"],
//   },
//   {
//     roomDescription: "Deluxe room with premium amenities.",
//     roomType: "Deluxe",
//     bedCount: 2,
//     roomPrice: 250,
//     facilities: ["Wi-Fi", "TV", "Balcony"],
//     images: ["/public/images/image-5.jpeg", "/public/images/image-1.jpeg"],
//   },
// ];
// const rooms = [];
// roomType.forEach((room) => {
//   for (let i = 1; i < 11; i++) {
//     // console.log(
//     //   i,
//     //   roomType.indexOf(room),
//     //   100 * (roomType.indexOf(room) + 1) + i
//     // );
//     room.roomNo = 100 * (roomType.indexOf(room) + 1) + i;
//     console.log(room, "hhhh");
//     rooms.push(room);
//   }
// });
// for (let id; id < roomType; id++) {
//   for (let i = 1; i < 11; i++) {
//     // console.log(
//     //   i,
//     //   roomType.indexOf(room),
//     //   100 * (roomType.indexOf(room) + 1) + i
//     // );
//     roomType[id].roomNo = 100 * (id + 1) + i;

//     rooms.push(roomType[id]);
//   }
// }

import mongoose from "mongoose";
await mongoose.connect(
  "mongodb+srv://c44groupC:aAnNzNZxL6wwGBqn@cluster0.wp8wxor.mongodb.net/?retryWrites=true&w=majority"
);
await Room.updateMany(
  {},
  {
    $set: {
      images: [
        "https://c44-group-c-5ea6be59db5d.herokuapp.com/public/images/image-1.jpeg",
        "https://c44-group-c-5ea6be59db5d.herokuapp.com/public/images/image-2.jpeg",
      ],
    },
  }
);
