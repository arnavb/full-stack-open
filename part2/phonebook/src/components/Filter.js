import React from "react";

const Filter = ({value, handleChange}) => {
  return (
    <>
      filter by name:{" "}
      <input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
    </>
  );
};

export default Filter;
