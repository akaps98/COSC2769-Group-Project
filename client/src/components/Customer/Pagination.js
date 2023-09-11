import React from 'react'
import "../../assets/styles/product.css"

function Pagination({ totalProducts, productsPerPage, setThisPage }) {
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            {pages.map((page, idx) => {
                return <button className='paginationBtn mt-3 mx-1' key={idx} onClick={() => setThisPage(page)}>{page}</button>
            })}
        </>
    )
}

export default Pagination;