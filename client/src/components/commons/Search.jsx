import React from 'react';
const Search=({ displaySearch })=> {
    if (displaySearch) {
        return (
        <>
        <div className="hide_search-overlay">
          <div className="close-btn" onclick="hideSearchForm()">
            <p>&times;</p>
          </div>
          <div id="search-form">
            <form className="search-bar">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">search</button>
            </form>
          </div>
        </div>
        </>
    )
    }
    else{
        return (null)
    }

}
export default Search