import React from 'react'

const Paginacion = () => {

    const currentPage = 1;
    const totalPages = 6;
    const onPageChange = 0;
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
}

export default Paginacion