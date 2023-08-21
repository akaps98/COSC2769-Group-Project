import React from "react";

function ProductTableRow(props) {
    function handleDelete(e){
        const { value } = e.target;
        props.delete();
        props.pID(parseInt(value));
    }
    function handleUpdate(e){
        const { value } = e.target;
        props.getProduct(parseInt(value));
    }
    return (
        <tr id={props.product.id}>
            <td><img src={props.product.image} alt="Nothing..." /></td>
            <td>{props.product.name}</td>
            <td>{props.product.price.toLocaleString() + " vnd"}</td>
            <td>{props.product.category}</td>
            <td>{props.product.dateAdded}</td>
            <td>
                <button className="product-update-btn" value={props.product.id} onClick={handleUpdate}/>
                <button className="product-delete-btn" value={props.product.id} onClick={handleDelete}/>
            </td>
        </tr>
    )
}

export default ProductTableRow;