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
            <td className="col-sm-2"><img src={props.product.image} alt="Nothing..." /></td>
            <td className="col-sm-2">{props.product.name}</td>
            <td className="col-sm-2">{props.product.price.toLocaleString() + " ₫"}</td>
            <td className="col-sm-2">{props.product.category}</td>
            <td className="col-sm-2">{props.product.dateAdded}</td>
            <td className="col-sm-2">
                <button className="product-update-btn" value={props.product.id} onClick={handleUpdate}/>
                <button className="product-delete-btn" value={props.product.id} onClick={handleDelete}/>
            </td>
        </tr>
    )
}

export default ProductTableRow;