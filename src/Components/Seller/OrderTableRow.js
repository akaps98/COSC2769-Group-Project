import React from "react";

function OrderTableRow({ order, getOrder }) {
    function handleClick(e) {
        const { name } = e.target;
        if (name !== "Shipped" && name !== "Canceled"){
            const id = parseInt(e.currentTarget.getAttribute("id"));
            getOrder(id);
        }
    }
    return (
        <tr className="order-row-container" id={order.id} key={order.id} onClick={handleClick}>
            <td className="col-sm-2">{order.id}</td>
            <td className="col-sm-2">{order.pName}</td>
            <td className="col-sm-2">{order.quantity}</td>
            <td className="col-sm-2"><p className={"status-text " + order.status}>{order.status}</p></td>
            <td className="col-sm-4">
                {order.status === "New" &&
                    <div>
                        <button className="order-ship-btn" name="Shipped" value={order.id}>Shipped</button>
                        <button className="order-cancel-btn" name="Canceled" value={order.id}>Canceled</button>
                    </div>
                }
            </td>
        </tr>
    )
}

export default OrderTableRow;