import React, { useState } from "react";
import "./CSS/roomDetailsCard.css";
import PropTypes from "prop-types";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { Container } from "react-bootstrap";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [extraBed, setExtraBed] = useState("");
  const [babyBed, setBabyBed] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [roomCount, setRoomCount] = useState(0);

  const handleAddButtonClick = () => {
    setIsAdded(!isAdded);
    if (isAdded) {
      setRoomCount(roomCount - 1);
    } else {
      setRoomCount(roomCount + 1);
    }
  };

  // const handleAddButtonClick = () => {
  //   setIsAdded(!isAdded);
  // };

  const addButtonLabel = isAdded ? "Delete" : "Add";

  const handleClick = (index) => {
    const slider = imgs[index];
    setSliderData(slider);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="room-container-01">
        <div className="imgs-01">
          <img src={sliderData.value} className="hotel-imgs-01" />
          <div className="flex-column-01">
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
        <div>
          <h3 className="desc-01">Description</h3>
          <div className="room-info-01">
            <ul>
              <li>Bla</li>
              <li>Bla</li>
              <li>Bla</li>
              <li>Bla</li>
              <li>Bla</li>
            </ul>
          </div>
        </div>

        <div className="right-bar-01">
          <div>
            <div className="bed-option-01">
              <h4 className="bed-option-01-h4">Extra bed</h4>
              <label>
                <input
                  type="checkbox"
                  name="ExtraBedYes"
                  checked={extraBed === "Yes"}
                  onChange={() => setExtraBed("Yes")}
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ExtraBedNo"
                  checked={extraBed === "No"}
                  onChange={() => setExtraBed("No")}
                />
                No
              </label>
            </div>

            <div className="bed-option-01">
              <h4 className="bed-option-01-h4">Baby bed</h4>
              <label>
                <input
                  type="checkbox"
                  name="BabyBedYes"
                  checked={babyBed === "Yes"}
                  onChange={() => setBabyBed("Yes")}
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="BabyBedNo"
                  checked={babyBed === "No"}
                  onChange={() => setBabyBed("No")}
                />
                No
              </label>
            </div>
          </div>

          <div className="bed-type-01">
            <div className="dropdown-01">
              <button onClick={toggleDropdown} className="button-02">
                Bed Type
                {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
              </button>

              {isOpen && (
                <ul className="dropdown-menu-01">
                  <li
                    onClick={() => handleOptionSelect("Single bed")}
                    className="dropdown-menu-01-li"
                  >
                    Single bed
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Two Single beds")}
                    className="dropdown-menu-01-li"
                  >
                    Two Single beds
                  </li>
                  <li
                    onClick={() => handleOptionSelect("King bed")}
                    className="dropdown-menu-01-li"
                  >
                    King bed
                  </li>
                </ul>
              )}
            </div>
            <p className={selectedOption ? "option-01" : "empty-box"}>
              {selectedOption}
            </p>
          </div>
        </div>

        <div className="book-buttons-01">
          <button className="button-02">Total amount</button>
          <button className="button-02" onClick={handleAddButtonClick}>
            {addButtonLabel}
          </button>
          <button className="button-02">Rooms Added: {roomCount}</button>
        </div>
      </div>
    </Container>
  );
}

export default RoomDetailsCard;
