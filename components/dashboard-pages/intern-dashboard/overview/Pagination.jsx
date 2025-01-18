"use client";

import { useState } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handleClick = (event, page) => {
    event.preventDefault();
    handlePageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="ls-pagination">
      <ul>
        <li className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
          <a href="#" onClick={(e) => handleClick(e, currentPage - 1)}>
            <i className="fa fa-arrow-left"></i>
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <a
                href="#"
                className={currentPage === page ? "current-page" : ""}
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
          <a href="#" onClick={(e) => handleClick(e, currentPage + 1)}>
            <i className="fa fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
