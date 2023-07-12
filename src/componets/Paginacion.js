import React, { useState, useEffect } from 'react';
import { useSolicitud } from "../context/SolicitudContext";

const Paginacion = () => {
    const { paginacion, setPaginacion, getSolicitudesUIF } = useSolicitud();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 6;
    const pageNumbers = Array.from({ length: paginacion.paginas }, (_, index) => index + 1);

    useEffect(() => {
        getSolicitudesUIF();
    }, [paginacion.offset]); // Ejecutar solo cuando el offset cambie

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const nuevoOffset = (pageNumber - 1) * paginacion.limit;
        console.log(nuevoOffset);
        setPaginacion(prevOffset => ({
            ...prevOffset,
            offset: nuevoOffset
        }));
    };

    return (
        <div className="d-flex justify-content-center my-2">
            {pageNumbers.map((pageNumber) => (
                <button
                    className='m-2'
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

export default Paginacion;
