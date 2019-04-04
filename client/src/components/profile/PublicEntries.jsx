import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import Entry from "../diaries/entry";
import Pagination from "../commons/Pagination";
import { fetchUserPublicEntries } from "../../actions/entryActions";
import toastNotification from "./../../utils/toastNotification";

const Dairies = ({dispatch, publicEntries, currentPage } ) => {
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const loadNextPage=()=> {
    handlePageChange(currentPage+1)
  }
  const loadPrevPage=()=>{
    handlePageChange(currentPage-1)
  }
  useEffect(() => {
    handlePageChange();
  }, []);
  const handlePageChange = (pageNumber) => {
    dispatch(fetchUserPublicEntries(pageNumber))
      .then(() => {
        console.log("success");
        setIsloading(false)
      })
      .catch(error => {
        console.log("fail");
        setIsloading(false);
        setIsError(true)
      });
  };
if (isLoading){
  return (<h1>Loading</h1>)
}
else if(isError){
  return (<h1>Error!</h1>)
}
else {

const {entries} = publicEntries;
const entryList =  entries.map(entry=>{
  return(
    <>
      <Entry 
      key={entry.entry_id}
      imageUrl={entry.entry_image_url}
      title={entry.title}
      username={entry.username}
      viewCount={entry.view_count}
      entryId={entry.entry_id}
      />
    </>
  )
    
})
console.log(entries)
 return (
 <>    
 <NavigationBar />
    <div class="entries-container">
    {entryList}
    </div> 
    <Pagination loadNextPage={loadNextPage} loadPrevPage={loadPrevPage} />
    <Footer />
 </>
);  
}

};
const mapStateToProps = state => {
  console.log(state);
  return {
    publicEntries: state.entries,
    currentPage:state.entries.currentPage
  };
};
export default connect(mapStateToProps)(Dairies);