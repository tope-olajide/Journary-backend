import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import Entry from "./entry";
import Pagination from "../commons/Pagination";
import { fetchAllPublicEntries } from "../../actions/entryActions";
import toastNotification from "./../../utils/toastNotification";

const Dairies = ({dispatch, allPublicEntries, currentPage } ) => {
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
    dispatch(fetchAllPublicEntries(pageNumber))
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

const {entries} = allPublicEntries;
const entryList =  entries.map(entry=>{
  return(
    <>
      <Entry 
      key={entry.entry_id}
      imageUrl={entry.entry_image_url}
      title={entry.title}
      username={entry.username}
      viewCount={entry.view_count}
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
    allPublicEntries: state.entries,
    currentPage:state.entries.currentPage
  };
};
export default connect(mapStateToProps)(Dairies);
