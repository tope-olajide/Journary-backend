import React, { useEffect, useState } from "react";
import Details from "./Details";
import { fetchUserEntryDetails } from "../../actions/entryActions";
import { connect } from "react-redux";

const viewEntry = ({ dispatch,entryDetails, match }) => {
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const { entryId } = match.params;
    fetchEntryDetails(entryId);
  }, []);
  const fetchEntryDetails = (entryId) => {
    
    console.log(entryId);
    dispatch(fetchUserEntryDetails(entryId))
      .then(() => {
        console.log("success");
        setIsloading(false);
      })
      .catch(error => {
        console.log("fail");
        setIsloading(false);
        setIsError(true);
      });
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  } else if (isError) {
    return <h1>Error!</h1>;
  } else {
    const formatDate = unformatedDate => {
      const date = new Date(unformatedDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    return (
      <>
        <Details 
        title={entryDetails.title}
        content={entryDetails.content}
        date={formatDate(entryDetails.created_at)}
        entryImage={entryDetails.entry_image}
        />
      </>
    );
  }
};
const mapStateToProps = state => {
  console.log(state.entries.entryDetails);
  return {
    entryDetails:state.entries.entryDetails[0]
  };
};
export default connect(mapStateToProps)(viewEntry);
