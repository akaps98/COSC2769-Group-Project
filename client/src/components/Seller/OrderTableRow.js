import React from "react";

function OrderTableRow({ order, index, getOrder }) {
    function handleClick(e) {
        const i = parseInt(e.currentTarget.getAttribute("id"));
        getOrder(i);
    }

    return (
        <tr className="order-row-container" id={index} key={index} onClick={handleClick}>
            <td className="col-sm-1">{order.OrderID}</td>
            <td className="col-sm-2">{order.username}</td>
            <td className="col-sm-2">{order.name}</td>
            <td className="col-sm-1">{order.quantity}</td>
            <td className="col-sm-2">{order.date.slice(0,10)}</td>
            <td className="col-sm-1"><p className={"status-text " + order.status}>{order.status}</p></td>
            <td className="col-sm-2">
                {order.status === "New" &&
                    <p className="order-update" value={order.OrderID}>Update needed</p>
                }
            </td>
        </tr>
    )
}

export default OrderTableRow;