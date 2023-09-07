import OrderRow from "./OrderRow"

function OrderPage() {
    return (
        <div className="shopping-container w-75 mx-auto my-5 px-5 pb-5 bg-light ">
            <h2 className='mb-3'>Your Order</h2>
            <table className='table table-light text-start'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col" colSpan={2}>Status</th>
                        <th scope="col">Receive</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderRow />
                </tbody>
            </table>
        </div>
    )
}

export default OrderPage