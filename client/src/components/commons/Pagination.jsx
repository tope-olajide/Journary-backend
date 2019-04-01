import React from 'react'
const Pagination =({loadNextPage,loadPrevPage})=>{
    return (
        <>
        <div className="pagination-container">
        <div className="prev-page" onClick={loadPrevPage}><i class="fas fa-angle-double-left"></i> Prev</div>
        <div className="next-page" onClick={loadNextPage}>Next <i class="fas fa-angle-double-right"></i></div>
        
        </div>
        </>
    )
}
export default Pagination