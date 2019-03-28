import React from "react";
const SubmitButton = ({ handleSubmit,isLoading,submitValue }) => {
  return (
    <>
      <div className="submit-entry_btn">
        <button onClick={handleSubmit} disabled={isLoading}>{submitValue}</button>
      </div>
    </>
  );
};
export default SubmitButton;
