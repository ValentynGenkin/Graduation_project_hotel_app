import React, { useState } from "react";
import "./CSS/roomDetailsCard.css";
import PropTypes from "prop-types";

function RoomDetailsCard() {
  RoomDetailsCard.propTypes = {
    data: PropTypes.array.isRequired,
  };

  const imgs = [
    {
      id: 0,
      value:
        "https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=",
    },
    {
      id: 1,
      value:
        "https://www.worldtravelplanner.co.uk/wp-content/uploads/2016/03/view.ritzcarltonhonghong.jpg",
    },
    {
      id: 2,
      value:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu6WTYAhoV3lSV_ct216R0TxsFVwdJS6uf_NFN81_XZ9p6elnhQGCYwYBa6rVNuAVPbUM&usqp=CAU",
    },
    {
      id: 3,
      value:
        "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/w-barcelona.jpg?ssl=1",
    },
    {
      id: 4,
      value:
        "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/the-ritz-carlton-hong-kong-china.jpg?fit=970%2C546&ssl=1",
    },
  ];
  const [sliderData, setSliderData] = useState(imgs[0]);

  const handleClick = (index) => {
    // console.log(index)
    const slider = imgs[index];
    setSliderData(slider);
  };
  return (
    <div className="container">
      <div className="imgs">
        <img src={sliderData.value} height="500" width="70%" />
        <div className="flex-column">
          {imgs.map((data, i) => (
            <img
              className={sliderData.id == i ? "clicked" : ""}
              src={data.value}
              onClick={() => handleClick(i)}
              height="80"
              width="160"
              key={data.id}
            />
          ))}
        </div>
      </div>
      <div className="room-info">
        <div>
          <h3>Description</h3>
          <br />
          <ul>
            <li>Bla</li>
            <li>Bla</li>
            <li>Bla</li>
            <li>Bla</li>
            <li>Bla</li>
          </ul>
        </div>
        <div className="buttons">
          <button>Total amount</button>
          <button>Book</button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailsCard;
