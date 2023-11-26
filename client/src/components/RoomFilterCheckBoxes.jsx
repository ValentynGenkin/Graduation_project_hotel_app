import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";
import "./CSS/roomFilterCheckboxes.css";

const RoomFilterCheckBoxes = ({ setFilters }) => {
  RoomFilterCheckBoxes.propTypes = {
    setFilters: PropTypes.func.isRequired,
  };
  const [filterItems, setFilterItems] = useState({});
  const [checkedState, setCheckedState] = useState({
    facilities: {},
    roomTypes: {},
    bedCounts: {},
  });
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/rooms/getFilters",
    (response) => {
      setFilterItems(response.filters);
      let currentCheckedState;
      if (!localStorage.getItem("filterPreferences")) {
        currentCheckedState = {
          facilities: response.filters.facilities.reduce((acc, facility) => {
            acc[facility] = false;
            return acc;
          }, {}),
          roomTypes: response.filters.roomTypes.reduce((acc, type) => {
            acc[type] = false;
            return acc;
          }, {}),
          bedCounts: response.filters.bedCounts.reduce((acc, count) => {
            acc[count] = false;
            return acc;
          }, {}),
        };
        localStorage.setItem(
          "filterOptions",
          JSON.stringify(currentCheckedState)
        );
      } else {
        currentCheckedState = JSON.parse(localStorage.getItem("filterOptions"));
      }

      setCheckedState(currentCheckedState);
    }
  );

  const handleOnChange = (event) => {
    const { name, attributes, checked } = event.target;
    const group = attributes.group.value;
    if (checked === true) {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [group]: prevFilters[group] ? prevFilters[group] + "," + name : name,
        };
      });
    } else {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [group]: prevFilters[group]
            ? prevFilters[group]
                .split(",")
                .filter((filterName) => filterName !== name)
                .join(",")
            : "",
        };
      });
    }

    setCheckedState((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [name]: checked,
      },
    }));
  };
  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);
  const facilities = filterItems.facilities
    ? filterItems.facilities.map((facility) => {
        return (
          <label key={facility}>
            {facility}
            <input
              type="checkbox"
              group="facilities"
              name={facility}
              checked={checkedState["facilities"][facility]}
              onChange={handleOnChange}
            />
          </label>
        );
      })
    : [];
  const roomTypes = filterItems.roomTypes
    ? filterItems.roomTypes.map((type) => {
        return (
          <label key={type}>
            {type}
            <input
              type="checkbox"
              group="roomType"
              name={type}
              checked={checkedState["facilities"][type]}
              onChange={handleOnChange}
            />
          </label>
        );
      })
    : [];
  const bedCounts = filterItems.bedCounts
    ? filterItems.bedCounts.map((count) => {
        return (
          <label key={count}>
            {count}
            <input
              type="checkbox"
              group="bedCount"
              name={count}
              checked={checkedState["facilities"][count]}
              onChange={handleOnChange}
            />
          </label>
        );
      })
    : [];

  return isLoading ? (
    <p>loading</p>
  ) : (
    <>
      {error ? <p>{error.message}</p> : ""}
      <div className="room-filters-0-7">
        <div className="filter-group-0-7">
          <span className="filter-group-title-0-7">Room Type:</span>
          {roomTypes}
        </div>
        <div className="filter-group-0-7">
          <span className="filter-group-title-0-7">Facilities:</span>
          {facilities}{" "}
        </div>
        <div className="filter-group-0-7">
          <span className="filter-group-title-0-7">Bed Count:</span>
          {bedCounts}{" "}
        </div>
      </div>
    </>
  );
};

export default RoomFilterCheckBoxes;
