import React from 'react';

const Pagination = ({page, size,nextPage, prevPage}) => {



    return ( <nav aria-label="...">
                <ul className="pagination">
                <li className="page-item ">
                    <button className="page-link" tabIndex="-1" onClick={prevPage} >Previous</button>
                </li>
                {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active">
                    <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                <li className="page-item">
                    <button className="page-link" onClick={nextPage}>Next</button>
                </li>
                </ul>
            </nav> );
}
 
export default Pagination;