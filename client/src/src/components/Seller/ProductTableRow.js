import React from "react";

function ProductTableRow({ product, handleDeleteModalShow, setProductId, getProduct }) {
    function handleDelete(e){
        const { value } = e.target;
        handleDeleteModalShow();
        setProductId(parseInt(value));
    }
    function handleUpdate(e){
        const { value } = e.target;
        getProduct(parseInt(value));
    }
    return (
        <tr id={product.id}>
            <td className="col-sm-2"><img src={product.image} alt="Nothing..." /></td>
            <td className="col-sm-2">{product.name}</td>
            <td className="col-sm-2">{product.price.toLocaleString() + " ₫"}</td>
            <td className="col-sm-2">{product.category}</td>
            <td className="col-sm-2">{product.dateAdded}</td>
            <td className="col-sm-2">
                <button className="product-update-btn" value={product.id} onClick={handleUpdate}/>
                <button className="product-delete-btn" value={product.id} onClick={handleDelete}/>
            </td>
        </tr>
    )
}

export default ProductTableRow;