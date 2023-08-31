import React from 'react'

function Pagination({ totalProducts, productsPerPage, setThisPage }) {
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            {pages.map((page, idx) => {
                return <button key={idx} onClick={() => setThisPage(page)}>{page}</button>
            })}
        </>
    )
}

export default Pagination;