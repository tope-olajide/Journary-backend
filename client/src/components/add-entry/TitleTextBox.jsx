import React from "react";

const TitleTextBox = ({ saveTitleToState }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        onChange={event => {
          saveTitleToState(event.target.value);
        }}
      />
    </>
  );
};
export default TitleTextBox;
