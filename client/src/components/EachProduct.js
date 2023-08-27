import React from 'react';

function EachProduct({ data }) {
    return (
        <>
            <h2>{data.name}</h2>
            <h2>{data.description}</h2>
            <h2>{data.quantity}</h2>
        </>
    )
}

export default EachProduct;