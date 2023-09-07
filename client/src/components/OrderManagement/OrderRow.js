import iphone from '../../assets/images/products/iPhone14.png'
import '../../assets/styles/cart.css'

function OrderRow() {
    return (
        <tr>
            <th scope="row">1</th>
            <td className='d-flex'>
                <img src={iphone} className='item-img d-block'></img>
                <div className='item-info ps-4'>
                    <h3 className='item-name'>Name</h3>
                    <p className='item-date text-warning py-0'>[Date Added: 18/11/2023]</p>
                    <h5 className=''>Quantity: <span>10</span></h5>
                    <h5 className=''>Price: <span>50,000 VND</span></h5>
                </div>

            </td>
            <td>Shipped</td>
            <td>
                <div className='order-container'>
                    <button className='d-block order-btn bg-danger mb-3'>Declined</button>
                    <button className='d-block order-btn bg-primary'>Accepted</button>
                </div>
            </td>
            <td>Process</td>
            
        </tr>
    )
}

export default OrderRow