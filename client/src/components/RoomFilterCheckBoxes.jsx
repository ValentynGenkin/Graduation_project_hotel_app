import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const RoomFilterCheckBoxes = ({ setFilters }) => {
  RoomFilterCheckBoxes.propTypes = {
    setFilters: PropTypes.func.isRequired,
  };
  const [filterItems, setFilterItems] = useState({});
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/rooms/getFilters",
    (response) => setFilterItems(response.filters)
  );

  const handleOnChange = (event) => {
    const { name, group } = event.target;
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [group]: prevFilters[group] ? prevFilters[group] + "," + name : name,
      };
    });
  };
  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);
  const facilities = filterItems.facilities
    ? filterItems.facilities.map((facility) => {
        return (
          <label key={facility}>
            {facility}:
            <input
              type="checkbox"
              group="facilities"
              name={facility}
              checked={false}
              onChange={handleOnChange}
            />
          </label>
        );
      })
    : [];
  const roomTypes = filterItems.roomType
    ? filterItems.roomType.map((type) => {
        return (
          <label key={type}>
            {type}:
            <input
              type="checkbox"
              name={type}
              checked={false}
              onChange={handleOnChange}
            />
          </label>
        );
      })
    : [];
  const bedCounts = filterItems.bedCount
    ? filterItems.bedCount.map((count) => {
        return (
          <label key={count}>
            {count}:
            <input
              type="checkbox"
              name={count}
              checked={false}
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
      <div>
        <div className="filter-group">Room Types: {roomTypes} </div>
        <div className="filter-group">Facilities: {facilities} </div>
        <div className="filter-group">Bed Count: {bedCounts} </div>
      </div>
    </>
  );
};

export default RoomFilterCheckBoxes;
